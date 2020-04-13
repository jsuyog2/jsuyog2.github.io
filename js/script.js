var userId;

console.log(access_token);
console.log(graphAccessToken);

if (access_token !== null && graphAccessToken !== null) {
    userId = getUserId();
    $("#loginBtn").hide();
}
//var fields = ["biography", "id", "website", "follows_count", "profile_picture_url", "media_count", "name", "followers_count", "username", "ig_id"];
//$.ajax({
//    url: graphUrl + userId + "?fields=" + fields.join() + "&access_token=" + graphAccessToken,
//    async: false,
//    success: function (response) {
//        $("h3").html(response.name);
//        $("h5").html(response.biography);
//        $("h6").html(response.website);
//        $("#profile_pic").html("<img src='" + response.profile_picture_url + "'/>");
//        $("#media_count").html(response.media_count);
//        $("#follows_count").html(response.follows_count);
//        $("#followers_count").html(response.followers_count);
//    },
//    error: function (xhr, status, error) {
//        switch (xhr.responseJSON.error.code) {
//            case 190:
//                console.log(true)
//                break;
//        }
//    }
//});
