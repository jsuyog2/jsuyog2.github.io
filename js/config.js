var appid = "491767988111690";
var redirect_uri = "https://jsuyog2.github.io/";
var client_secret = "41e83aee7b9f0a25983a3a9685f8e3c8";
var access_token = localStorage.getItem("InstaAceessToken");
localStorage.removeItem("InstaAceessToken");
var ApiUrl = "https://graph.instagram.com/me";
var graphUrl = "https://graph.facebook.com/v6.0/";
var graphAccessToken = "EAAjN91njmv8BAPqKKu8VEn2isZBHmz1GKG1NAc2EcmcZAKVNBTsZCzzHZA4k7wGAS1yZCq5cFoGKXIIvsF3oHVTi6wkIJyoFxoA33x593V9qer93eKJfCHy3cALhx6TSHg5T0bh3yBn7Ugo5bgAq7z9XFnBuwKeS3qhk3DW3sJjKRbfgNb2Hz8tSlkOfmrrdMe6415M2QZACoiJsr3AtFn";
var FBInit = {
    appId: appid,
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
