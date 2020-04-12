function calculateRouteFromAtoB(platform, startingPoint, endPoint) {
    var router = platform.getRoutingService(),
        routeRequestParams = {
            mode: 'fastest;car',
            representation: 'display',
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action',
            waypoint0: startingPoint,
            waypoint1: endPoint
        };


    router.calculateRoute(
        routeRequestParams,
        onSuccess,
        onError
    );
}

function onSuccess(result) {
    var route = result.response.route[0];
    addRouteShapeToMap(route);
    addManueversToMap(route);
    addSummaryToPanel(route.summary);
}

function onError(error) {
    alert('Ooops!');
}

var mapContainer = document.getElementById('map'),
    routeInstructionsContainer = document.getElementById('panel');

var platform = new H.service.Platform({
    'app_id': 'YLJimxqR6szOHWxWLhex',
    'app_code': '8pP47klOkZKCj1XUUmWj4A',
    useHTTPS: true
});

var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
});

var map = new H.Map(mapContainer,
    defaultLayers.normal.map, {
        center: {
            lat: 21.191389540760312,
            lng: 78.32599123583788
        },
        zoom: 5,
        pixelRatio: pixelRatio
    });

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, defaultLayers);

function addRouteShapeToMap(route) {
    var lineString = new H.geo.LineString(),
        routeShape = route.shape,
        polyline;

    routeShape.forEach(function (point) {
        var parts = point.split(',');
        lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new H.map.Polyline(lineString, {
        style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
    });
    map.addObject(polyline);
    map.setViewBounds(polyline.getBounds(), true);
}

function addSummaryToPanel(summary) {
    var summaryDiv = document.createElement('div'),
        content = '';
    content += '<b>Total distance</b>: ' + summary.distance + 'm. <br/>';
    content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';


    summaryDiv.style.fontSize = 'small';
    summaryDiv.style.marginLeft = '5%';
    summaryDiv.style.marginRight = '5%';
    summaryDiv.innerHTML = content;
    routeInstructionsContainer.appendChild(summaryDiv);
}

function addManueversToMap(route) {
    var svgMarkup = '<svg width="18" height="18" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="8" cy="8" r="8" ' +
        'fill="#1b468d" stroke="white" stroke-width="1"  />' +
        '</svg>',
        dotIcon = new H.map.Icon(svgMarkup, {
            anchor: {
                x: 8,
                y: 8
            }
        }),
        group = new H.map.Group(),
        i,
        j;
    for (i = 0; i < route.waypoint.length; i += 1) {
        var marker = new H.map.Marker({
            lat: route.waypoint[i].mappedPosition.latitude,
            lng: route.waypoint[i].mappedPosition.longitude
        }, {
            icon: dotIcon
        });
        group.addObject(marker);
    }

    map.addObject(group);
}


Number.prototype.toMMSS = function () {
    return Math.floor(this / 60) + ' minutes ' + (this % 60) + ' seconds.';
}

//        calculateRouteFromAtoB(platform,,);
