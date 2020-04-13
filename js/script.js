console.log(access_token);
console.log(graphAccessToken);
console.log(userId);
var fields = ["biography", "id", "website", "follows_count", "profile_picture_url", "media_count", "name", "followers_count", "username", "ig_id"];
if (access_token !== null && graphAccessToken !== null) {
    $.ajax({
        url: graphUrl + userId + "?fields=" + fields.join() + "&access_token=" + graphAccessToken,
        async: false,
        success: function (response) {
            $(".header").html(response.name);
            $("title").html(response.name + " | Social Vision");
            addProfilePic(response.profile_picture_url);
            $("h5").html(response.biography);
            $("h6").html(response.website);

            $("#media_count").html(response.media_count);
            $("#follows_count").html(response.follows_count);
            $("#followers_count").html(response.followers_count);
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

function addProfilePic(src) {
    var elem = document.createElement("img");
    elem.classList.add("circle");
    elem.setAttribute("src", src);
    elem.setAttribute("height", "768");
    elem.setAttribute("width", "1024");
    document.getElementById("slide-out").appendChild(elem);
}
