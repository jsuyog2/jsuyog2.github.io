console.log(access_token);
console.log(graphAccessToken);
console.log(userId);
var fields = ["biography", "id", "website", "follows_count", "profile_picture_url", "media_count", "name", "followers_count", "username", "ig_id"];
if (access_token !== null && graphAccessToken !== null) {
    $.ajax({
        url: graphUrl + userId + "?fields=" + fields.join() + "&access_token=" + graphAccessToken,
        async: false,
        success: function (response) {
            $("#introduction").empty();
            $(".header").html(response.name);
            $("title").html(response.name + " | Social Vision");
            addProfilePic(response.profile_picture_url);
            addUsername(response.username)
            addBio(response.biography)
            addWebsite(response.website)

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

function addElem(elem, class_name) {
    var li = document.createElement("li");
    li.classList.add(class_name);
    document.getElementById("introduction").appendChild(li).appendChild(elem);
}

function addProfilePic(src) {
    var elem = document.createElement("img");
    elem.classList.add("circle");
    elem.setAttribute("src", src);
    elem.setAttribute("height", "100");
    elem.setAttribute("width", "100");
    addElem(elem, "profile_pic")
}

function addUsername(username) {
    var elem = document.createElement("p");
    var textnode = document.createTextNode(username);
    elem.appendChild(textnode);
    addElem(elem, "user_name")
}

function addBio(text) {
    var elem = document.createElement("div");
    text = text.replace(/↵/g, "<br>");
    var textnode = document.createTextNode(text);
    elem.appendChild(textnode);
    addElem(elem, "user_bio")
}

function addWebsite(text) {
    var elem = document.createElement("a");
    var textnode = document.createTextNode(text);
    elem.href = text;
    elem.appendChild(textnode);
    addElem(elem, "user_web")
}
