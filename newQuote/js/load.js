$(document).ready(function () {

    if ($("#title").length != 0) {
        var title = document.getElementById("title");
        var tagline = document.getElementById("tagline");
        var titleRef = database.ref().child('index/title');
        var taglineRef = database.ref().child('index/tagline');
        titleRef.on('value', snap => title.innerHTML = snap.val());
        taglineRef.on('value', snap => tagline.innerHTML = snap.val());
    }

    if ($('#logo-container').length != 0) {
        var logoContainer = document.getElementById("logo-container");
        var logoContainerRef = database.ref().child('header/logoContainer');
        logoContainerRef.on('value', snap => logoContainer.innerHTML = snap.val());
    }

});

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
