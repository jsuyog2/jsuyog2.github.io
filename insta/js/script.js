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

            if (window.matchMedia('(max-width: 767px)').matches) {
                $(".followers_count.section").show();
            } else {
                $(".followers_count.row").show();
            }
            $(".file_upload").show();
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

$("#imgInp").change(function (e) {
    src = URL.createObjectURL(e.target.files[0]);
    var style = "background-image: url(" + src + ");";
    var div = '<div class="square" style="' + style + '"></div>';
    $("#media .row").prepend(div);
});
$("#confirmUp").click(function () {
    if (document.getElementById("imgInp").value != "") {
        $("#profile_row").toggle();
        $("#upload_row").toggle();
        if ($('#profile_row').css('display') == 'none') {
            $("#confirmUp").html("Cancel Upload");
        } else {
            $("#confirmUp").html("Confirm Upload");
        }
    } else {
        console.log(false)
    }
});

$(".autocomplete").keyup(function () {
    if ($(this).val() !== "") {
        autoCompleteProduct(this);
    }
});

//get data for autocomplete
function autoCompleteProduct(context) {
    $.ajax({
        async: true,
        method: 'GET',
        url: 'https://graph.facebook.com/search',
        data: {
            type: 'place',
            q: context.value,
            fields: "name",
            access_token: graphAccessToken
        },
        success: function (result) {
            if ($(context).val() != '') {
                autoCompleteSuccess(result, context);
            }
        }
    });
}

//set data into autocomplete
function autoCompleteSuccess(response, elem) {
    var values = {};
    var data = response.data;
    data.forEach(function (a) {
        values[a.name] = null;
    });
    const autocomplete = document.querySelector('#' + elem.id);
    var instance = M.Autocomplete.getInstance(autocomplete);
    instance.updateData(values);
}

$(".tagUser").focusout(function () {
    if ($(this).val() !== "") {
        userExist(this, $(this).val());
    }
})

$("textarea").on("input", function () {
    var text = $(this).val();
    var hashCount = (text.match(/(^|\W)(#[a-z\d][\w-]*)/g) || []).length;
    var atCount = (text.match(/(^|\W)(@[a-z\d][\w-]*)/g) || []).length;
    if (hashCount <= 30 && atCount <= 20) {
        $(this).addClass("valid");
        $(this).removeClass("invalid");
    } else {
        $(this).addClass("invalid");
        $(this).removeClass("valid");
    }
}).trigger('input');

$("#upload").click(function () {
    var caption = "";
    var users = [];
    var location = "";
    var captionData = true;
    var tagData = true;
    var locationData = true;

    if ($(".tagUser.invalid").length === 0) {
        $.each($(".tagUser"), function (i, item) {
            if ($(item).val() !== "") {
                var user = $(item).val();
                users.push({
                    username: user,
                    x: 0.5,
                    y: 0.8
                });
            }
        });
        tagData = true;
    } else {
        tagData = false;
    }
    for (var i = 0; i < users.length - 1; i++) {
        for (var j = i + 1; j < users.length; j++) {
            if (users[i].username === users[j].username) {
                tagData = false;
            }
        }
    }

    if ($("textarea.invalid").length === 0) {
        caption = $("#textarea1").val();
        captionData = true;
    } else {
        captionData = false;
    }

    if ($(".autocomplete").val() !== "") {
        location = oncomplete($(".autocomplete").val());
        if (location === false) {
            locationData = false;
        } else {
            locationData = true;
        }
    }

    if (captionData === true && tagData === true && locationData === true) {
        var imgUrl = "";
        var uploadUrl = "graph.facebook.com/";
        uploadUrl += userId + "/media?";
        uploadUrl += "image_url=" + imgUrl;
        if (caption !== "") {
            uploadUrl += "&caption=" + caption;
        }
        if (users.length !== 0) {
            uploadUrl += "&user_tags=" + JSON.stringify(users);
        }
        if (location !== "") {
            uploadUrl += "&location_id=" + location;
        }
        console.log(uploadUrl)
    } else {
        console.log(false)
    }
});
