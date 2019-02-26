// Initialize Firebase
var config = {
    apiKey: "AIzaSyCixnoh4CKmEcddxuOa5NrKdlz2EaHGCvY",
    authDomain: "trip-calculator-bf075.firebaseapp.com",
    databaseURL: "https://trip-calculator-bf075.firebaseio.com",
    projectId: "trip-calculator-bf075",
    storageBucket: "",
    messagingSenderId: "618050462065"
};
firebase.initializeApp(config);
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
