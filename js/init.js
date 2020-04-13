var oauthUrl = "https://api.instagram.com/oauth/authorize?client_id=" + appid + "&redirect_uri=" + redirect_uri + "&scope=user_profile,user_media&response_type=code";
$(".loginBtn").attr("href", oauthUrl);
$('.sidenav').sidenav();