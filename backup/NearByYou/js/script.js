mapboxgl.accessToken = 'pk.eyJ1IjoianN1eW9nMiIsImEiOiJjamx4OXRobWkwejlpM3FwYXgxNmZvZ2Z1In0.fapbTYAb7JN1zz8vmIdosA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [72.8194, 18.9696], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);
map.addControl(new mapboxgl.NavigationControl()); // Add zoom and rotation controls
$('.sidenav').sidenav();
$('input.autocomplete').autocomplete({
    onAutocomplete: function (e) {
        oncomplete(e)
    },
});


$(".autocomplete").keyup(function () {
    autoCompleteProduct(this);
});

function oncomplete(value) {
    $.ajax({
        async: false,
        method: 'GET',
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + value + '.json',
        data: {
            types: 'place',
            access_token: mapboxgl.accessToken
        },
        success: function (result) {
            if (result.features[0].bbox) {
                map.fitBounds(result.features[0].bbox);
            } else {
                map.flyTo({
                    center: result.features[0].center,
                    essential: true
                });
            }
        }
    });
}


//get data for autocomplete
function autoCompleteProduct(context) {
    $.ajax({
        async: false,
        method: 'GET',
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + context.value + '.json',
        data: {
            types: 'place',
            access_token: mapboxgl.accessToken
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
    var values = {};
    var data = response.features;
    data.forEach(function (a) {
        values[a.place_name] = null;
    });
    const autocomplete = document.querySelector('#' + elem.id);
    var instance = M.Autocomplete.getInstance(autocomplete);
    instance.updateData(values);
}
