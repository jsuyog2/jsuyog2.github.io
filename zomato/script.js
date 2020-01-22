var followedby = 'https://www.zomato.com/php/social_load_more.php';
var follows = 'https://www.zomato.com/php/social_load_more.php';
var followsArray = getUSER(follows);
var followedbyArray = getUSER(followedby);
var NOT_FOLLOW_ME_BACK = comapare(followsArray, followedbyArray);
var FAN = comapare(followedbyArray, followsArray);
$('#totalFollowing').html('Following (' + followsArray.length + ')');
$('#totalFollowers').html('Followers (' + followedbyArray.length + ')');
$('#totalFan').html('Fan (' + FAN.length + ')');
$('#totalFollowBack').html('Not Follow Back (' + NOT_FOLLOW_ME_BACK.length + ')');
displayCard('follow_back', NOT_FOLLOW_ME_BACK);
displayCard('fan', FAN);



function displayCard(id, array) {
    if (array.length !== 0) {
        array.forEach(function (data) {
            var html = '<div class="col s12 m7"><a target="_blank" href="';
            html += data.href;
            html += '"><div class="card horizontal"><div class="card-stacked"><div class="card-content"><div style="margin-bottom:0%;" class="row"><div class="col s6"><img style="width:50%;" src="';
            html += data.img;
            html += '" alt="" class="circle"></div><div class="col s6"><div class="row">'
            html += data.name;
            html += '</div></div></div></div></div></div></a></div>';
            $('#' + id).append(html);
        });
    }
}

function comapare(json1, json2) {
    var array = [];
    if (JSON.stringify(json1) === JSON.stringify(json2)) return;
    json1.forEach(function (JSON1data) {
        var flag = 0;
        json2.forEach(function (JSON2data) {
            if (JSON1data.href === JSON2data.href) {
                flag++;
            }
        });
        if (flag !== 1) {
            array.push(JSON1data);
        }
    });
    return array;
}

function getUSER(url) {
    var array = [];
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            entity_id: 37710027,
            profile_action: 'followedby',
            page: 0,
            limit: 1000,
        },
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            $(data.html).each(function (index) {
                if ($(this).find('a')[1] !== undefined) {
                    array.push({
                        name: $(this).find('a')[1].text.trim(),
                        href: $(this).find('a')[1].href.trim(),
                        img: $(this).find('img')[0].dataset.original
                    });
                }
            });
        }
    });
    return array;
}
