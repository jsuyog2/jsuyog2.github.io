var oauthUrl = "https://api.instagram.com/oauth/authorize?client_id=" + appid + "&redirect_uri=" + redirect_uri + "&scope=user_profile,user_media&response_type=code";
$(".loginBtn").attr("href", oauthUrl);
$('.sidenav').sidenav();
$('input.autocomplete').autocomplete({
    onAutocomplete: function (e) {

    },
});

function oncomplete(value) {
    var id;
    $.ajax({
        async: false,
        method: 'GET',
        url: 'https://graph.facebook.com/search',
        data: {
            type: 'place',
            q: value,
            fields: "name",
            access_token: graphAccessToken
        },
        success: function (result) {
            if (result.data.length !== 0) {
                id = result.data[0].id;
            } else {
                id = false;
            }

        }
    });
    return id;
}

function userExist(context, user) {
    $.ajax({
        async: true,
        method: 'GET',
        url: 'https://username-availability.herokuapp.com/check/instagram/' + user,
        success: function (result) {
            if (result.status === 200) {
                $(context).addClass("valid");
                $(context).removeClass("invalid");
            } else {
                $(context).addClass("invalid");
                $(context).removeClass("valid");

            }
        }
    });
}

