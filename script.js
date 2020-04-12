var appid = "491767988111690";
var redirect_uri = "https://jsuyog2.github.io/InstagramInsights";
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
        code: getUrlVars()["code"]
    },
    success: function (response) {
        console.log(response)
    }
});


console.log("curl -X POST https://api.instagram.com/oauth/access_token -F client_id=" + appid + " -F client_secret=" + client_secret + " -F grant_type=authorization_code -F redirect_uri=" + redirect_uri + " -F code=" + getUrlVars()["code"]);

"curl -X POST"
"https://api.instagram.com/oauth/access_token"
"-F client_id=491767988111690"
"-F client_secret=41e83aee7b9f0a25983a3a9685f8e3c8"
"-F grant_type=authorization_code"
"-F redirect_uri=https://jsuyog2.github.io/InstagramInsights"
"-F code=AQDjnH9lUzQHSCb8I7E97p6v2rUosxD44m63mng2tbUiQ225r8KyTdOjDsXKq3YlBbZCPnayoA8uhKG7bqFqDATQ93_H3zRo_aqdO3uzILGV0VUHpU_u0eLvqk03DUiYBpDl6ee9DvLy4kG0_2ehjhTUUpURA_yjixaqD-eXI16xJHnODPbdJO1vuMC2zg3frh-5rfiFikHTUPoc0kfzUOGRzlbojHueaND7-B4BM44sZQ#_"