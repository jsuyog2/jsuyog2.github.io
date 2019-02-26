var provider = new firebase.auth.GoogleAuthProvider();

//on Login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('.navbarData').append('<li><a href="dashborad.html">Dashborad</a></li>');
        $('.navbarData').append(' <li><a onclick="singOut()">Logout</a></li>');
        if ($('meta[name="login"]').length != 0) {

        }
    } else {
        $('.navbarData').append('<li><a href="Login.html">Login</a></li>');
        if ($('meta[name="login"]').length != 0) {
            window.location.href = "Login";
        }
    }
});

//google login
$('#loginGoogle').click(function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        window.location.href = "index";
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

//email password auth
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

//register
function register(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        window.location.href = "login";
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            M.toast({
                html: 'The password is too weak.'
            })
        } else {
            M.toast({
                html: errorMessage
            })
        }
        M.toast({
            html: error
        })
        // [END_EXCLUDE]
    });
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

$("#registerUser").click(function () {
    var email = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    register(email, password);
});

$(".register").on('keypress', function (e) {
    if (e.which == 13) {
        var email = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        register(email, password);
    }
});

//sign Out
function singOut() {
    firebase.auth().signOut().then(function () {
        M.toast({
            html: 'Sign-out successful'
        });
        sessionStorage.setItem("login", false);
        window.location.href = "Login";
    }).catch(function (error) {
        // An error happened.
    });
}
