var url = 'https://www.zomato.com/php/social_load_more.php';
var data = {
    entity_id: 37710027,
    profile_action: 'followedby',
    page: 0,
    limit: 1000,
}


$.ajax({
    type: 'POST',
    url: url,
    crossDomain: true,
    data: data,
    dataType: 'json',
    async: false,
    beforeSend: setHeader,
    success: function (data) {
        console.log('success');
    },
    error: function () {
        console.log('Failed!');
    }
});

function setHeader(xhr) {
    xhr.setRequestHeader('access-control-allow-origin', '*');
}
