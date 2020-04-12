var appid = "491767988111690";
var redirect_uri = "https://jsuyog2.github.io/";
var client_secret = "41e83aee7b9f0a25983a3a9685f8e3c8";

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

if (getUrlVars()["code"] === undefined) {
    var url = "https://api.instagram.com/oauth/authorize?client_id=" + appid + "&redirect_uri=" + redirect_uri + "&scope=user_profile,user_media&response_type=code";
    window.location.href = url;
}

$.ajax({
    url: 'https://api.instagram.com/oauth/access_token',
    type: "POST",
    async: false,
    data: {
        client_id: appid,
        client_secret: client_secret,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri,
        code: getUrlVars()["code"].slice(0, -2)
    },
    success: function (response) {
        console.log(response)
        localStorage.setItem("InstaAceessToken", response.access_token);
    },
    error: function (xhr,error) {
        console.log(xhr.responseJSON)
    }
});
