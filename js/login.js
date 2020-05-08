var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = firebase.auth().currentUser;
            var userId = user.uid;
            var name = user.displayName;
            var email = user.email;
            database.ref('/users/' + userId).once('value').then(function (snapshot) {
                if (snapshot.val() === null) {
                    database.ref('users/' + userId).set({
                        username: name,
                        coins: 0,
                        email: email
                    }, function (error) {
                        if (error) {
                            // The write failed...
                        } else {
                            loginStatus();
                        }
                    });
                } else {
                    loginStatus();
                }
            });
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
