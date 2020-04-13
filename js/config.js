var appid = "491767988111690";
var redirect_uri = "https://jsuyog2.github.io/";
var client_secret = "41e83aee7b9f0a25983a3a9685f8e3c8";
var access_token = localStorage.getItem("InstaAceessToken");
var graphAccessToken = localStorage.getItem("FBAceessToken");
localStorage.removeItem("InstaAceessToken");
localStorage.removeItem("FBAceessToken");
var ApiUrl = "https://graph.instagram.com/me";
var graphUrl = "https://graph.facebook.com/v6.0/";
var FBInit = {
    appId: "2478262062390015",
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v6.0'
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
