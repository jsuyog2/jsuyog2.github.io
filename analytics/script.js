var name = decodeURIComponent(getUrlVars()['name']);
var date1 = getUrlVars()['date1'];
var date2 = getUrlVars()['date2'];
var array = [];
upadateField();
$('#picker1').datepicker({
    format: "yyyy-mm-dd",
    autoClose: true,
    maxDate: new Date(),
    onSelect: function (date) {
        $("#picker2").prop('disabled', false);
        $('#picker2').datepicker({
            format: "yyyy-mm-dd",
            autoClose: true,
            minDate: date,
            maxDate: new Date()
        });
    }
});

if (getUrlVars()['name'] !== undefined && date1 !== undefined && date2 !== undefined) {
    var names = decodeURIComponent(getUrlVars()['name']).split(",");
    names.forEach(function (user) {
        callApi(user, date1, date2);
    });
    table(array)
}

$('#submit').click(function () {
    getUsername()
});

$("#user_name").on('keypress', function (e) {
    if (e.which == 13) {
        getUsername()
    }
});

function upadateField() {
    var name = decodeURIComponent(getUrlVars()['name']);
    var date1 = decodeURIComponent(getUrlVars()['date1']);
    var date2 = decodeURIComponent(getUrlVars()['date2']);
    if (getUrlVars()['name'] !== undefined) {
        $('#user_name').val(name);
    }
    if (getUrlVars()['date1'] !== undefined) {
        $('#picker1').val(date1);
        if (getUrlVars()['date2'] !== undefined) {
            $('#picker2').val(date2);
            $("#picker2").prop('disabled', false);
            $('#picker2').datepicker({
                format: "mm-dd-yyyy",
                autoClose: true,
                minDate: new Date(date1),
                maxDate: new Date()
            });
        }
    }
    M.updateTextFields();
}

function getUsername() {
    var username = $('#user_name').val().trim();
    var date1 = $('#picker1').val().trim();
    var date2 = $('#picker2').val().trim();
    if (username !== '' && date1 !== '' && date2 !== '') {
        var location = '';
        location += "?name=" + username;
        location += '&date1=' + date1 + '&date2=' + date2;
        window.location = location.trim();
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter the Username and Date',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        console.log('fill full Details');
    }
}

function getCount(json, name, type) {
    var name = name.toLowerCase();
    var value = 0;
    var length = 1;
    var uid = '';
    var user = '';
    json.forEach(function (elem) {
        var tag = elem.tag;
        user = elem.user;
        uid = elem.uid;
        if (name in tag) {
            if (type === 'way') {
                var line = turf.lineString(elem.geom);
                length = turf.lineDistance(line);
            }
            value = value + length;
        }
    });
    if (value !== 0) {
        array.push({
            user: user,
            uid: uid,
            type: type,
            layer: name,
            total: value
        })
    }
}

function callApi(name, date1, date2) {
    //    var url = 'http://overpass-api.de/api/interpreter';
    var url = 'https://lz4.overpass-api.de/api/interpreter';
    var data = '';
    if (date1 !== undefined && date2 !== undefined) {
        data += '[diff:"' + date1 + 'T00:00:00Z","' + date2 + 'T00:00:00Z"]'
    }
    data += '[bbox:10.6795321,75.8255821,11.5292791, 76.5453213];'
    data += '(node[building](user:"' + name + '");way[building](user:"' + name + '");rel[building](user:"' + name + '");way[highway](user:"' + name + '");way[waterway](user:"' + name + '");way[railway](user:"' + name + '");node[amenity](user:"' + name + '");way[amenity](user:"' + name + '");rel[amenity](user:"' + name + '");way[aerialway](user:"' + name + '");rel[aerialway](user:"' + name + '");way[aeroway](user:"' + name + '");rel[aeroway](user:"' + name + '");way[barrier](user:"' + name + '");rel[barrier](user:"' + name + '");way[boundary](user:"' + name + '");rel[boundary](user:"' + name + '");node[craft](user:"' + name + '");rel[craft](user:"' + name + '");node[Emergency](user:"' + name + '");rel[Emergency](user:"' + name + '");node[geological](user:"' + name + '");rel[geological](user:"' + name + '");node[historic](user:"' + name + '");rel[historic](user:"' + name + '");rel[landuse](user:"' + name + '");rel[leisure](user:"' + name + '");node[leisure](user:"' + name + '");rel[man_made](user:"' + name + '");way[man_made](user:"' + name + '");node[military](user:"' + name + '");rel[military](user:"' + name + '");way[military](user:"' + name + '");node[natural](user:"' + name + '");rel[natural](user:"' + name + '");way[natural](user:"' + name + '");node[office](user:"' + name + '");rel[office](user:"' + name + '");way[place](user:"' + name + '");rel[place](user:"' + name + '");node[place](user:"' + name + '");rel[power](user:"' + name + '");node[power](user:"' + name + '");way[power](user:"' + name + '");rel[public_transport](user:"' + name + '");node[public_transport](user:"' + name + '");way[public_transport](user:"' + name + '");way[route](user:"' + name + '");node[shop](user:"' + name + '");rel[shop](user:"' + name + '");node[sport](user:"' + name + '");rel[sport](user:"' + name + '");rel[telecom](user:"' + name + '");node[telecom](user:"' + name + '");node[tourism](user:"' + name + '");rel[tourism](user:"' + name + '");)->.result;'
    data += '.result out 64 meta geom qt;'
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'text/plain',
        data: data,
        async: false,
        success: function (data) {
            var json = getJson(data);

            //node
            getCount(json, 'building', 'node');
            getCount(json, 'amenity', 'node');
            getCount(json, 'craft', 'node');
            getCount(json, 'emergency', 'node');
            getCount(json, 'geological', 'node');
            getCount(json, 'historic', 'node');
            getCount(json, 'landuse', 'node');
            getCount(json, 'leisure', 'node');
            getCount(json, 'man_made', 'node');
            getCount(json, 'office', 'node');
            getCount(json, 'shop', 'node');
            getCount(json, 'sport', 'node');
            getCount(json, 'telecom', 'node');
            getCount(json, 'tourism', 'node');

            //ways
            getCount(json, 'highway', 'way');
            getCount(json, 'waterway', 'way');
            getCount(json, 'railway', 'way');
            getCount(json, 'aerialway', 'way');
            getCount(json, 'aeroway', 'way');
            getCount(json, 'barrier', 'way');
            getCount(json, 'boundary', 'way');
            getCount(json, 'route', 'way');
        }
    });
}

function getJson(data) {
    var array = [];
    var action = data.getElementsByTagName("action");
    if (action.length !== 0) {
        for (i = 0; i < action.length; i++) {
            var type = action[i].getAttribute('type');
            switch (type) {
                case 'create':
                    array.push(getTagsValue(action[i].childNodes[1]));
                    break;
                case 'modify':
                    array.push(getTagsValue(action[i].getElementsByTagName("new")[0].childNodes[1]));
                    break;
                case 'delete':
                    break;
            }
        }
    } else {
        var node = data.getElementsByTagName("node");
        for (i = 0; i < node.length; i++) {
            array.push(getTagsValue(node[i]));
        }

        var way = data.getElementsByTagName("way");
        for (i = 0; i < way.length; i++) {
            array.push(getTagsValue(way[i]));
        }

        var relation = data.getElementsByTagName("relation");
        for (i = 0; i < relation.length; i++) {
            array.push(getTagsValue(relation[i]));
        }
    }
    return array
}

function getTagsValue(tags) {
    var type = tags.tagName;
    var uid = tags.getAttribute('uid');
    var user = tags.getAttribute('user');
    var timestamp = tags.getAttribute('timestamp');
    var tag = getTags(tags);
    var geom = [];
    switch (type) {
        case 'node':
            var lat = tags.getAttribute('lat');
            var lon = tags.getAttribute('lon');
            geom.push(lat, lon);
            break;
        case 'way':
            geom = getLine(tags.getElementsByTagName("nd"))
            break;
        case 'relation':
            geom = getPoly(tags.getElementsByTagName("member"))
            break;
    }
    return ({
        type,
        user,
        uid,
        geom,
        timestamp,
        tag
    })
}

function getLine(cod) {
    var coordinates = [];
    for (var i = 0; i < cod.length; i++) {
        var lat = cod[i].getAttribute('lat');
        var lon = cod[i].getAttribute('lon');
        coordinates.push([lat, lon]);
    }
    return coordinates
}

function getPoly(member) {
    var poly = [];
    for (var i = 0; i < member.length; i++) {
        var line = [];
        var cod = member[i].getElementsByTagName("nd");
        for (var j = 0; j < cod.length; j++) {
            var lat = cod[j].getAttribute('lat');
            var lon = cod[j].getAttribute('lon');
            line.push([lat, lon]);
        }
        poly.push(line);
    }
    return poly
}

function getTags(data) {
    var tag = data.getElementsByTagName("tag");
    var json = {};
    for (var i = 0; i < tag.length; i++) {
        var key = tag[i].getAttribute('k');
        var value = tag[i].getAttribute('v');
        json[key] = value;
    }
    return json;
}

function table(data) {
    $('#example').DataTable({
        data: data,
        dom: 'Bfrtip',
        buttons: [
             'csv'
        ],
        columns: [
            {
                data: 'user'
                    },
            {
                data: 'layer'
            },
            {
                data: function (row) {
                    switch (row.type) {
                        case 'node':
                            return row.total;
                            break;
                        case 'way':
                            return row.total.toFixed(2) + ' KM';
                            break;
                    }
                    return row.total
                }
            }
                ]
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
