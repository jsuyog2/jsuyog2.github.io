$(document).ready(function () {

    if ($("#title").length != 0) {
        firebaseReadDataIndex("title","index");
        firebaseReadDataIndex("tagline","index");
       
    }

    if ($('#logo-container').length != 0) {
           firebaseReadDataIndex("logo-container","header");
    }

    if ($('.blockSection').length != 0) {
        var blockFirstElms = document.getElementById("blockFirst").getElementsByTagName("*");
        firebaseReadDataForSection(blockFirstElms[1], "1", "icon");
        firebaseReadDataForSection(blockFirstElms[2], "1", "title");
        firebaseReadDataForSection(blockFirstElms[3], "1", "paragraph");


        var blockSecondElms = document.getElementById("blockSecond").getElementsByTagName("*");
        firebaseReadDataForSection(blockSecondElms[1], "2", "icon");
        firebaseReadDataForSection(blockSecondElms[2], "2", "title");
        firebaseReadDataForSection(blockSecondElms[3], "2", "paragraph");

        var blockThirdElms = document.getElementById("blockThird").getElementsByTagName("*");
        firebaseReadDataForSection(blockThirdElms[1], "3", "icon");
        firebaseReadDataForSection(blockThirdElms[2], "3", "title");
        firebaseReadDataForSection(blockThirdElms[3], "3", "paragraph");

    }

});

function firebaseReadDataForSection(id, block, element) {

    var Ref = database.ref().child('index/block/' + block + '/' + element);
    Ref.on('value', snap => id.innerHTML = snap.val());
}

function firebaseReadDataIndex(id,section) {
    var idGet = document.getElementById(id);
    var Ref = database.ref().child(section+'/'+id);
    Ref.on('value', snap => idGet.innerHTML = snap.val());
}

$("#login").click(function () {
    var email = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    login(email, password);
});

$(".login").on('keypress', function (e) {
    if (e.which == 13) {
        var email = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        login(email, password);
    }
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('.navbarData').append('<li><a href="dashborad.html">Dashborad</a></li>');
        $('.navbarData').append(' <li><a onclick="singOut()">Logout</a></li>');
        if ($('meta[name="login"]').length != 0) {

        }
    } else {
        $('.navbarData').append('<li><a href="auth.html">Login</a></li>');
        if ($('meta[name="login"]').length != 0) {
            window.location.href = "auth";
        }
    }
});

function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            window.location.href = "dashborad";
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                M.toast({
                    html: errorCode
                })
            } else {
                M.toast({
                    html: errorMessage
                })
            }
        });
}

function singOut() {
    firebase.auth().signOut().then(function () {
        M.toast({
            html: 'Sign-out successful'
        });
        sessionStorage.setItem("login", false);
        window.location.href = "auth";
    }).catch(function (error) {
        // An error happened.
    });
}
