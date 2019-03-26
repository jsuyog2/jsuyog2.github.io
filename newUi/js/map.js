var APPLICATION_ID = 'YLJimxqR6szOHWxWLhex';
var APPLICATION_CODE = '8pP47klOkZKCj1XUUmWj4A';

var mapContainer = document.getElementById('map'),
    routeInstructionsContainer = document.getElementById('panel');

// Initialize the platform object:
var platform = new H.service.Platform({
    'app_id': APPLICATION_ID,
    'app_code': APPLICATION_CODE
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
}

function onError(error) {
    alert('Ooops!');
}

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

function autoCompleteListener(textBox, event) {
    if (query != textBox.value) {
        if (textBox.value.length >= 1) {
            var params = '?' +
                'query=' + encodeURIComponent(textBox.value) + // The search text which is the basis of the query
                '&beginHighlight=' + encodeURIComponent('<mark>') + //  Mark the beginning of the match in a token. 
                '&endHighlight=' + encodeURIComponent('</mark>') + //  Mark the end of the match in a token. 
                '&maxresults=5' + // The upper limit the for number of suggestions to be included 
                // in the response.  Default is set to 5.
                '&app_id=' + APPLICATION_ID +
                '&app_code=' + APPLICATION_CODE;
            ajaxRequest.open('GET', AUTOCOMPLETION_URL + params);
            ajaxRequest.send();
        }
    }
    query = textBox.value;
}

function onAutoCompleteSuccess() {

    clearOldSuggestions();
    addSuggestionsToPanel(this.response); // In this context, 'this' means the XMLHttpRequest itself.
    addSuggestionsToMap(this.response);
}


function onAutoCompleteFailed() {
    alert('Ooops!');
}

$(".autocomplete").keyup(function () {
    autoCompleteProduct(this, APPLICATION_ID, APPLICATION_CODE);
});

//get data for autocomplete
function autoCompleteProduct(context, APPLICATION_ID, APPLICATION_CODE) {
    $.ajax({
        url: "https://autocomplete.geocoder.api.here.com/6.2/suggest.json",
        dataType: 'json',
        type: "GET",
        data: {
            "query": $(context).val(),
            "maxresults": 5,
            "app_id": APPLICATION_ID,
            "app_code": APPLICATION_CODE
        },
        success: function (result) {
            if ($(context).val() != '') {
                autoCompleteSuccess(result, context);
            }
        }
    });
}

//set data into autocomplete
function autoCompleteSuccess(response, elem) {
    var dataLength = Object.keys(response.suggestions).length;
    var dataArr = {};
    for (var i = 0; i < dataLength; i++) {
        //         dataArr.push(response.suggestions[i].label);
        dataArr[response.suggestions[i].label] = null;
    }
    const autocomplete = document.querySelector('#' + elem.id);
    var instance = M.Autocomplete.getInstance(autocomplete);
    instance.updateData(dataArr);

}
var startLat, startLong, endLat, endLong;

function getletlong(context) {
    $.ajax({
        url: "https://geocoder.api.here.com/6.2/geocode.json",
        dataType: 'json',
        type: "GET",
        data: {
            "searchtext": $(context.el).val(),
            "app_id": APPLICATION_ID,
            "app_code": APPLICATION_CODE
        },
        success: function (result) {

            if (context.el.id == "from_input") {
                startLat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                startLong = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                $("#to_input").prop('disabled', false);
            } else if (context.el.id == "to_input") {
                endLat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                endLong = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                getDistance(startLat, startLong, endLat, endLong);
                calculateRouteFromAtoB(platform, startLat + ',' + startLong, endLat + ',' + endLong);
            }
        }
    });
}

function getDistance(startLat, startLong, endLat, endLong) {
    var startLatLong = startLat + ',' + startLong;
    var endLatLong = endLat + ',' + endLong;
    $.ajax({
        url: "https://route.api.here.com/routing/7.2/calculateroute.json",
        dataType: 'json',
        type: "GET",
        data: {
            "waypoint0": startLatLong,
            "waypoint1": endLatLong,
            "mode": 'fastest;car;traffic:enabled',
            "app_id": APPLICATION_ID,
            "app_code": APPLICATION_CODE
        },
        success: function (result) {
            var temp = result.response.route[0].summary.distance
            var one = parseInt(String(temp).charAt(0));
            var numDec = (String(temp / 1000).split(".")[0].length) * 10;
            var extraKM = one * numDec;
            var distance = Math.round((result.response.route[0].summary.distance / 1000));
            $("#distance").html("Total KM: " + distance+"KM");
        }
    });
}
