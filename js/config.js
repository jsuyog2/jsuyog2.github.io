//Firebase Config
var firebaseConfig = {
    apiKey: "AIzaSyAPJPd7nyP7BS30vtO0BgtpHqc6IsA4rkI",
    authDomain: "socialvision-5da46.firebaseapp.com",
    databaseURL: "https://socialvision-5da46.firebaseio.com",
    projectId: "socialvision-5da46",
    storageBucket: "socialvision-5da46.appspot.com",
    messagingSenderId: "468093275490",
    appId: "1:468093275490:web:44c649ff2db835f4fd303b",
    measurementId: "G-E31E43RNEW"
};

//Instagram Config
var appid = "491767988111690";
var redirect_uri = "https://jsuyog2.github.io/dashboard.html";
var client_secret = "41e83aee7b9f0a25983a3a9685f8e3c8";
var ApiUrl = "https://graph.instagram.com/me";
var oauthUrl = "https://api.instagram.com/oauth/authorize?client_id=" + appid + "&redirect_uri=" + redirect_uri + "&scope=user_profile,user_media&response_type=code";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

//Initialize Materialize
$('.sidenav').sidenav();
$('.modal').modal();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function loginStatus() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "dashboard.html"
        }
    });
}
