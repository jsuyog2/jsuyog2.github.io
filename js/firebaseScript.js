var provider = new firebase.auth.GoogleAuthProvider();

//on Login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var name = user.displayName;
        var email = user.email;
        $('.navbarData').prepend('<li><div class="user-view"><div class="background"><img src="images/profileBack.png"></div><a><span class="white-text name">' + name + '</span></a><a><span class="white-text email">' + email + '</span></a></div></li>');
        $('.navbarData').append('<li><a href="dashborad.html">Save Trips</a></li>');
        if ($('meta[name="login"]').length != 0) {
            $('.navbarData').append('<li><a href="editprofile.html">Edit Profile</a></li>');
        }
        $('.navbarData').append('<li><a onclick="singOut()">Logout</a></li>');
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
        sendEmailVerification();
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

//email verification
function sendEmailVerification() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user.emailVerified) {
            console.log('verified');
        } else {
            user.sendEmailVerification();
            window.location.href = "varification";
        }
    });
}

//onclick reset password
function resetPassword(){
    firebase.auth().onAuthStateChanged(function (user) {
        var email = user.email;
        sendPasswordReset(email);
    });
}
//password change
function sendPasswordReset(email) {
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        window.location.href = "varification";
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            M.toast({
                html: errorMessage
            })
        } else if (errorCode == 'auth/user-not-found') {
            M.toast({
                html: errorMessage
            })
        }
        M.toast({
            html: error
        })
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
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
