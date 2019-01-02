 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyA2j-RQ3-OQxQCuAUUi5uiFd-TCqxVARso",
     authDomain: "goodmorningmessage-ada16.firebaseapp.com",
     databaseURL: "https://goodmorningmessage-ada16.firebaseio.com",
     projectId: "goodmorningmessage-ada16",
     storageBucket: "goodmorningmessage-ada16.appspot.com",
     messagingSenderId: "315271312037"
 };
 firebase.initializeApp(config);
 var database = firebase.database();

 var txt1Ref = database.ref().child('txt1');
 var txt2Ref = database.ref().child('txt2');
 var txt3Ref = database.ref().child('txt3');
 var txt4Ref = database.ref().child('txt4');
 var txt5Ref = database.ref().child('txt5');
 var txt6Ref = database.ref().child('txt6');
 var txt7Ref = database.ref().child('txt7');
 var txt8Ref = database.ref().child('txt8');
 var txt9Ref = database.ref().child('txt9');
 var txt10Ref = database.ref().child('txt10');
 var txt11Ref = database.ref().child('txt11');
 var txt12Ref = database.ref().child('txt12');
 $("#submit").click(function () {
     var txt1 = document.getElementById("edtxt1").value;
     var txt2 = document.getElementById("edtxt2").value;
     var txt3 = document.getElementById("edtxt3").value;
     var txt4 = document.getElementById("edtxt4").value;
     var txt5 = document.getElementById("edtxt5").value;
     var txt6 = document.getElementById("edtxt6").value;
     var txt7 = document.getElementById("edtxt7").value;
     var txt8 = document.getElementById("edtxt8").value;
     var txt9 = document.getElementById("edtxt9").value;
     var txt10 = document.getElementById("edtxt10").value;
     var txt11 = document.getElementById("edtxt11").value;
     var txt12 = document.getElementById("edtxt12").value;
     
     txt1Ref.set(txt1);
     txt2Ref.set(txt2);
     txt3Ref.set(txt3);
     txt4Ref.set(txt4);
     txt5Ref.set(txt4);
     txt6Ref.set(txt5);
     txt7Ref.set(txt6);
     txt8Ref.set(txt7);
     txt9Ref.set(txt8);
     txt10Ref.set(txt10);
     txt11Ref.set(txt11);
     txt12Ref.set(txt12);
 });
