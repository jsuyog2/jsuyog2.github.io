firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var userId = user.uid;
        var name = user.displayName;
        var email = user.email;
        $("title").html(name.toUpperCase() + " - SocialLike4Like");
        $("#head").html(currentStatus().toUpperCase() + ", " + name.toUpperCase());
        $("#addAcc").attr("href", oauthUrl);
        $("#addAcc").show();
        verifyAccessToken(userId);
    } else {
        // No user is signed in.
    }
});

function currentStatus() {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 10) {
        return 'Good Morning';
    } else if (curHr < 20) {
        return 'Good day';
    } else {
        return 'Good Evening';
    }
}

function verifyAccessToken(userId) {
    database.ref('users/' + userId).once('value').then(function (snapshot) {
        $("#coins").html('Your Coins: ' + snapshot.val().coins + ' <a class="btn-floating btn-small red"><i class="large material-icons">add</i></a>');
        if (snapshot.val().insta_token === undefined) {
            addInstaAccount(userId)
        } else {
            getUserId(userId, snapshot.val().insta_token);
            if (snapshot.val().post !== undefined) {
                addMediaUrl(snapshot.val().post.media_url);
            }
        }
    });
}

function addMediaUrl(id) {
    if (id !== "") {
        $("#addMediaModel h4").html("Change Media");
        $("#addUrl").html("Change Media");
    }
}

function addInstaAccount(userId) {
    if (getUrlVars()["code"] !== undefined) {
        getAccessToken(userId);
    }
}

function getUserId(userId, access_token) {
    var id;
    $.ajax({
        url: ApiUrl,
        async: false,
        data: {
            fields: "id,account_type,username,media_count",
            access_token: access_token
        },
        success: function (response) {
            $("#addAcc").remove();
            $("#addUrl").show();
            $("#addUrl").parent().prepend("<h5 class='center'>@" + response.username + "</h5>");
            addMediaImg(access_token);
        },
        error: function (xhr, status, error) {
            getAccessToken(userId);
        }
    });
    return id;
}

function getAccessToken(userId) {
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
            database.ref('users/' + userId).update({
                insta_token: response.access_token
            });
        },
        error: function (xhr, status, error) {
            if (xhr.responseJSON.code == 400) {
                window.location.href = oauthUrl;
            }
        }
    });
}

function addMediaImg(access_token) {
    var mediaFields = ["id", "username", "permalink", "media_url", "media_type", "thumbnail_url"];
    $.ajax({
        url: ApiUrl + "/media?fields=" + mediaFields.join() + "&access_token=" + access_token,
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
                var style = "background-image: url(" + src + ");";
                var div = '<div class="square" id="' + post.id + '" data-para="' + post.permalink + '" style="' + style + '" onclick="tryClick(this)"></div>';
                $("#addMediaModel #media_content").append(div);
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
$("#addMediaModel").modal({
    onOpenStart: function () {
        $(".square").css("border", "5px solid #00000000");
        var user = firebase.auth().currentUser;
        database.ref('users/' + user.uid).once('value').then(function (snapshot) {
            if (snapshot.val().post !== undefined) {
                $("#" + snapshot.val().post.media_id).css("border", "5px solid blue");
            }
        });
    }
});

function tryClick(context) {
    var link = $(context).data().para;
    var id = context.id;
    var user = firebase.auth().currentUser;
    database.ref('users/' + user.uid + "/post").update({
        media_id: id,
        media_url: link,
        like: 0
    });
    $("#addMediaModel").modal("close");
}
