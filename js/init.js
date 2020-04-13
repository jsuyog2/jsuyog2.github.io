var oauthUrl = "https://api.instagram.com/oauth/authorize?client_id=" + appid + "&redirect_uri=" + redirect_uri + "&scope=user_profile,user_media&response_type=code";
$(".loginBtn").attr("href", oauthUrl);
//localStorage.setItem("FBAceessToken", "EAAjN91njmv8BAKYveIJMiKe3f4qz7D17TMArJ19URhhJv4Yjk8v9WRK97CZAtH4mPjwogQHko45YFmXw4oMZAU0TRShvaSxgRoAiAVuBFyAoTLbaT64yefPs1VB7bKWvPH6OjOq3ya5MC1tdrZA5TpLxVbEFuCrZBMrluVXXVOcA9ou1g7FyOBXgNCDnW9B2feSG0y1H5xddnzU8pwZBa6CG9vGZC3SS0ZD");
//localStorage.setItem("InstaAceessToken", "IGQVJXaGZA3LWtSenFYN3kzZAGt3bGttUjk2R0l4ZAGJON1ZAHZAlNKMkVfa0UxN0d0UFRMYVVsSk11Y3pXR1AyN0djbnNkZAkh6YldHMGxXY0dKMkk0NXdQb2U3SzBmWjU4YTZAnd3lqVExHZA0ZAmMkhIbEM3VmxyT0lDS0tSeDlF");
$('.sidenav').sidenav();