var name = decodeURIComponent(getUrlVars()['name']);
var date1 = getUrlVars()['date1'];
var date2 = getUrlVars()['date2'];
var array = [];
upadateField();
$('#picker1').datepicker({
    format: "yyyy-mm-dd",
    autoClose: true,
    onSelect: function (date) {
        $("#picker2").prop('disabled', false);
        $('#picker2').datepicker({
            format: "yyyy-mm-dd",
            autoClose: true,
            minDate: date
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
    } else {
        console.log('fill full Details');
    }
    window.location = location.trim();
}

function callApi(name, date1, date2) {
    var url = 'http://overpass-api.de/api/interpreter';
    var data = '';
    if (date1 !== undefined && date2 !== undefined) {
        data += '[diff:"' + date1 + 'T00:00:00Z","' + date2 + 'T00:00:00Z"]'
    }
    data += '[bbox:10.6795321,75.8255821,11.5292791, 76.5453213];'
    data += '(node[building](user:"' + name + '");way[building](user:"' + name + '");rel[building](user:"' + name + '");way[highway](user:"' + name + '");way[waterway](user:"' + name + '");way[railway](user:"' + name + '");node[amenity](user:"' + name + '");way[amenity](user:"' + name + '");rel[amenity](user:"' + name + '");)->.result;'
    data += '.result out 64 meta geom qt;'
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'text/plain',
        data: data,
        async: false,
        success: function (data) {
            var json = getJson(data);
            var send = {};
            var building = 0;
            var highway = 0;
            var waterway = 0;
            var railway = 0;
            var amenity = 0;
            var user = '';
            var uid = '';
            json.forEach(function (elem) {
                var tag = elem.tag;
                user = elem.user;
                uid = elem.uid;
                if ('highway' in tag) {
                    var line = turf.lineString(elem.geom);
                    var length = turf.lineDistance(line);
                    highway = highway + length;
                }
                if ('building' in tag) {
                    building = building + 1;
                }
                if ('amenity' in tag) {
                    amenity = amenity + 1;
                }
                if ('waterway' in tag) {
                    var line = turf.lineString(elem.geom);
                    var length = turf.lineDistance(line);
                    waterway = waterway + length;
                }
                if ('railway' in tag) {
                    var line = turf.lineString(elem.geom);
                    var length = turf.lineDistance(line);
                    railway = railway + length;
                }
            });
            if (highway !== 0) {
                array.push({
                    user: user,
                    uid: uid,
                    type: 'way',
                    layer: "highway",
                    total: highway
                });
            }
            if (building !== 0) {
                array.push({
                    user: user,
                    uid: uid,
                    type: 'node',
                    layer: "building",
                    total: building
                });
            }
            if (amenity !== 0) {
                array.push({
                    user: user,
                    uid: uid,
                    type: 'node',
                    layer: "amenity",
                    total: amenity
                });
            }
            if (waterway !== 0) {
                array.push({
                    user: user,
                    uid: uid,
                    type: 'way',
                    layer: "waterway",
                    total: waterway
                });
            }
            if (railway !== 0) {
                array.push({
                    user: user,
                    uid: uid,
                    type: 'way',
                    layer: "railway",
                    total: railway
                });
            }
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
