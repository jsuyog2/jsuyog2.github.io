console.log(access_token);
console.log(graphAccessToken);
console.log(userId);
var userFields = ["biography", "id", "website", "follows_count", "profile_picture_url", "media_count", "name", "followers_count", "username", "ig_id"];
var mediaFields = ["media_type", "thumbnail_url", "media_url", "like_count", "comments_count"];
if (access_token !== null && graphAccessToken !== null && userId !== undefined) {
    $.ajax({
        url: graphUrl + userId + "?fields=" + userFields.join() + "&access_token=" + graphAccessToken,
        async: false,
        success: function (response) {
            $("title").html(response.name + " | Social Vision");
            $('.profile_pic').append('<img class="circle" id="profile_pic" src="' + response.profile_picture_url + '" />');
            $(".user_name").html(response.username);
            $(".name").html(response.name);
            var bio = response.biography.replace(/(?:\r\n|\r|\n)/g, '<br>');
            $(".bio").html(bio);
            $(".web").html("<a href=" + response.website + ">" + response.website + "</a>");

            $(".post").html("<b>" + response.media_count + "</b>");
            $(".following").html("<b>" + response.follows_count + "</b>");
            $(".followers").html("<b>" + response.followers_count + "</b>");
        },
        error: function (xhr, status, error) {
            switch (xhr.responseJSON.error.code) {
                case 190:
                    console.log(true)
                    break;
            }
        }
    });

    $.ajax({
        url: graphUrl + userId + "/media?fields=" + mediaFields.join() + "&limit=17&access_token=" + graphAccessToken,
        async: false,
        success: function (response) {
            response.data.forEach(function (post) {
                console.log(post);
                var src;
                switch (post.media_type) {
                    case "IMAGE":
                        src = post.media_url;
                        break;
                    case "VIDEO":
                        src = post.thumbnail_url;
                        break;
                    case "CAROUSEL_ALBUM":
                        src = post.media_url;
                        break;
                }
                var img = '<img class="post_img" src="' + src + '"/>'
                var style = "background-image: url(" + src + ");";
                var div = '<div class="square" style="' + style + '"></div>';
                $("#media .row").append(div);
            });
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
