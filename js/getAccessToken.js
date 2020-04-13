if (getUrlVars()["code"] !== undefined) {
    getAccessToken();
    $("#loginBtn").hide();
}
var userId = getUserId();

function getAccessToken() {
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
            localStorage.setItem("InstaAceessToken", response.access_token);
            access_token = response.access_token;
            getFBAccessToken();
        },
        error: function (xhr, status, error) {
            if (xhr.responseJSON.code == 400) {
                window.location.href = oauthUrl;
            }
        }
    });
}

function getUserId() {
    var id;
    $.ajax({
        url: ApiUrl,
        async: false,
        data: {
            fields: "id,username",
            access_token: access_token
        },
        success: function (response) {
            id = response.id;
        },
        error: function (xhr, status, error) {
            console.log(xhr)
        }
    });
    return id;
}

function getFBAccessToken() {
    window.fbAsyncInit = function () {
        FB.init(FBInit);
    };
}
