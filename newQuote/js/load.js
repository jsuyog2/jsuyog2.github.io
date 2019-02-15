$(document).ready(function () {

    if ($("#title").length != 0) {
        firebaseReadDataIndex("title", "index");
        firebaseReadDataIndex("tagline", "index");

    }
    if ($('meta[name="login"]').length != 0) {
        displayDataInInput("title", "index");
        displayDataInInput("tagline", "index");
        displayDataInInput("logo-container", "header");
        displayDataInSection("1");
        displayDataInSection("2");
        displayDataInSection("3");
    }

    if ($('#logo-container').length != 0) {
        firebaseReadDataIndex("logo-container", "header");
    }

    if ($('.blockSection').length != 0) {



firebaseReadDataForSection("blockFirst","1");
firebaseReadDataForSection("blockSecond","2");
firebaseReadDataForSection("blockThird","3");

 
    }

});


$("#submit").click(function () {
    if ($('meta[name="login"]').length != 0) {
        updateData('logo-containerChange', 'header', 'logo-container');
        updateData('titleChange', 'index', 'title');
        updateData('taglineChange', 'index', 'tagline');
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


function firebaseReadDataForSection(id,block) {
    var idGet = document.getElementById(id).getElementsByTagName("*");
    var Reficon = database.ref().child('index/block/' + block + '/' + "icon");
    var Reftitle = database.ref().child('index/block/' + block + '/' + "title");
    var Refparagraph = database.ref().child('index/block/' + block + '/' + "paragraph");
    
    Reficon.on('value', snap => idGet[1].innerHTML = snap.val());
    Reftitle.on('value', snap => idGet[2].innerHTML = snap.val());
    Refparagraph.on('value', snap => idGet[3].innerHTML = snap.val());
}

function firebaseReadDataIndex(id, section) {
    var idGet = document.getElementById(id);
    var Ref = database.ref().child(section + '/' + id);
    Ref.on('value', snap => idGet.innerHTML = snap.val());
}

function updateData(id, section, path) {
    var value = document.getElementById(id).value;
    var Ref = database.ref().child(section + '/' + path);
    Ref.set(value);
}

function displayDataInInput(id, section) {
    var idGet = document.getElementById(id + 'Change');
    var Ref = database.ref().child(section + '/' + id);
    Ref.on('value', snap => idGet.value = snap.val());
    M.updateTextFields();
}

function displayDataInSection(block) {
    var idGeticon = document.getElementById("b" + block + "icon" + 'Change');
    var idGettitle = document.getElementById("b" + block + "title" + 'Change');
    var idGetparagraph = document.getElementById("b" + block + "paragraph" + 'Change');
    var Reficon = database.ref().child('index/block/' + block + '/' + "icon");
    var Reftitle = database.ref().child('index/block/' + block + '/' + "title");
    var Refparagraph = database.ref().child('index/block/' + block + '/' + "paragraph");
    Reficon.on('value', snap => idGeticon.value = snap.val());
    Reftitle.on('value', snap => idGettitle.value = snap.val());
    Refparagraph.on('value', snap => idGetparagraph.value = snap.val());
    M.updateTextFields();
}
