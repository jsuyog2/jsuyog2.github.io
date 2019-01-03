$("#login").click(function () {
    var email = $('input[name=username]').val();
    var password = $('input[name=password]').val();


    
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        sessionStorage.setItem("login", true);
        window.location.href = "enterdata";
    })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
});