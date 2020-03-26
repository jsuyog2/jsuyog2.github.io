mapboxgl.accessToken = 'pk.eyJ1IjoianN1eW9nMiIsImEiOiJjazdteHdkNnUwaTA4M2dwYTR4YXpjZTdrIn0.wdQyveA-YYjSBG65jv-8EQ';
var brew = new classyBrew();
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-96, 37.8],
    zoom: 3,
    attributionControl: false,
    preserveDrawingBuffer: true
});

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('load', function () {
    var data = getData();
    if (data !== false) {
        map.addSource('corona', data.FeatureCollection);
        addPoint(data);
    }
});

map.on('click', 'corona-points', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    var html = '';
    html += '<h2><b>' + description.Combined_Key + '</b></h2>';
    html += '<b>Confirmed</b> : ' + description.Confirmed + '<br>';
    html += '<b>Recovered</b> : ' + description.Recovered + '<br>';
    html += '<b>Deaths</b> : ' + description.Deaths + '<br>';

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(map);
});

map.on('mouseenter', 'corona-points', function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'corona-points', function () {
    map.getCanvas().style.cursor = '';
});

function addPoint(data) {
    map.addLayer({
        'id': 'corona-points',
        'source': 'corona',
        'type': 'circle',
        'paint': {
            'circle-blur': 0.2,
            'circle-opacity': 0.7,
            'circle-radius': {
                "property": 'Confirmed',
                "type": 'exponential',
                "stops": data.classification.radius
            },
            'circle-color': {
                "property": 'Confirmed',
                "stops": data.classification.color
            }
        }
    });
}

function getData() {
    var geojson = [];
    var confirmData = [];
    $.ajax({
        url: 'https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/1/query',
        async: false,
        data: {
            f: 'json',
            where: '1=1',
            returnGeometry: false,
            spatialRel: 'esriSpatialRelIntersects',
            outFields: '*',
            orderByFields: 'Confirmed desc',
            resultOffset: '0',
            resultRecordCount: '190',
            cacheHint: true,
        },
        dataType: "json",
        success: function (data) {
            if (data.hasOwnProperty('error')) {
                $('#map').remove();
                var html = data.error.message + '<br>' + data.error.details[0]
                document.write(html);
            } else {
                data.features.forEach(function (features) {
                    confirmData.push(features.attributes.Confirmed);
                    var point = [features.attributes.Long_, features.attributes.Lat];
                    var json = {};
                    for (properties in features.attributes) {
                        if (properties !== 'Lat' && properties !== 'Long_') {
                            json[properties] = features.attributes[properties]

                        }
                    }

                    var feature = {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': point
                        },
                        'properties': json
                    }
                    geojson.push(feature);
                })
            }
        }
    });
    if (confirmData.length !== 0 && geojson.length !== 0) {
        var classification = getClassification(confirmData);
        var FeatureCollection = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': geojson
            }
        }
        return {
            FeatureCollection,
            classification
        };
    } else {
        return false;
    }
}

function getClassification(data) {
    var radius = [],
        color = [];
    var data = removeDuplicates(data);
    brew.setSeries(data); //set values to classify
    brew.setNumClasses(5); //set no of classes
    brew.setColorCode("Own"); //set color code
    brew.classify("Equal_interval"); //set classification method
    var getValInRangeRa = brew.getBreaks();
    console.log(getValInRangeRa)
    getValInRangeRa.forEach(function (feature, i) { //get column value range with circle radius
        radius.push([feature, (i + 1) * parseInt(3, 10)]) //push column values range with circle radius  radiusCk
    });
    data.forEach(function (feature) {
        color.push([feature, brew.getColorInRange(feature)]);
    });
    return {
        radius,
        color
    };
}

function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b)
};
