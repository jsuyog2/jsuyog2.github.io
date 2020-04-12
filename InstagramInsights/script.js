// $.ajax({
//     url: 'https://api.instagram.com/oauth/authorize',
//     async: false,
//     data: {
//         client_id: "491767988111690",
//         redirect_uri: "https://jsuyog2.github.io/",
//         scope: "user_profile,user_media",
//         response_type: "code"
//     },
//     success: function (response) {
//         console.log(response)
//     }
// });
var appid = "491767988111690";
var redirect_uri = "https://jsuyog2.github.io/InstagramInsights";

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

if (getUrlVars()["code"] === undefined) {
    var url = "https://api.instagram.com/oauth/authorize?client_id=" + appid + "&redirect_uri=" + redirect_uri + "&scope=user_profile,user_media&response_type=code"
    window.location.href = url;
}
