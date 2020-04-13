console.log(access_token);
console.log(graphAccessToken);
console.log(userId);
var fields = ["biography", "id", "website", "follows_count", "profile_picture_url", "media_count", "name", "followers_count", "username", "ig_id"];
if (access_token !== null && graphAccessToken !== null) {
    $.ajax({
        url: graphUrl + userId + "?fields=" + fields.join() + "&access_token=" + graphAccessToken,
        async: false,
        success: function (response) {
            $("title").html(response.name + " | Social Vision");
            $('.profile_pic').append('<img class="circle height="100" width="100" id="profile_pic" src="' + response.profile_picture_url + '" />');
            $(".user_name").html(response.username);
            $(".name").html(response.name);
            var bio = response.biography.replace(/(?:\r\n|\r|\n)/g, '<br>');
            $(".bio").html(bio);
            $(".web").html("<a href=" + response.website + ">" + response.website + "</a>");

            $(".post").html("<b>"+response.media_count+"</b> Posts");
            $(".following").html("<b>"+response.follows_count+"</b> followers");
            $(".followers").html("<b>"+response.followers_count+"</b> following");
        },
        error: function (xhr, status, error) {
            switch (xhr.responseJSON.error.code) {
                case 190:
                    console.log(true)
                    break;
            }
        }
    });
}
