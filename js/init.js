var oauthUrl = "https://api.instagram.com/oauth/authorize?client_id=" + appid + "&redirect_uri=" + redirect_uri + "&scope=user_profile,user_media&response_type=code";
$(".loginBtn").attr("href", oauthUrl);
//localStorage.setItem("FBAceessToken", "EAAjN91njmv8BAHcV57aKKIuxi0bHdrf3wZC6HLEdOmMSf9pju7kdTRxASPj1cW3g0hZAMmyKQMMTJOXrWIUnQZCo6OZCG5F5zpvEZAiBsKkLuKfFVn5ApFrMWfjoXQacK7zDLqbaWe89z5zm6LFCUkwZA73iu6MHquRUKPWRoRIqJZBHunHBtpv77Hdi4qF4qYFnuoYkBVgoN5vbXvi2zzYAttGBZCV8oN0ZD");
//localStorage.setItem("InstaAceessToken", "IGQVJWUlJ2QTJ0NmVwU0VwSVA1dlF6eC1vbVhIUkhWaXhKTkZAJcTZAIYzZA0b1otb1ZApb1RQc1UxNDdBV0l3ZA3NtNXE1eTg1UFF6eGNITkJSUEFMYkRCLXJMS2VJWGVsQzcwdzhOelZADWjJTelMzUTh3RDlkNU04V2pBcHBn");
$('.sidenav').sidenav();