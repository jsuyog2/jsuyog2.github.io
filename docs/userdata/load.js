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

 var txt1 = document.getElementById("txt1");
 var txt2 = document.getElementById("txt2");
 var txt3 = document.getElementById("txt3");
 var txt4 = document.getElementById("txt4");
 var txt5 = document.getElementById("txt5");
 var txt6 = document.getElementById("txt6");
 var txt7 = document.getElementById("txt7");
 var txt8 = document.getElementById("txt8");
 var txt9 = document.getElementById("txt9");
 var txt10 = document.getElementById("txt10");
 var txt11 = document.getElementById("txt11");
 var txt12 = document.getElementById("txt12");

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


 txt1Ref.on('value', snap => txt1.innerHTML = snap.val());
 txt2Ref.on('value', snap => txt2.innerHTML = snap.val());
 txt3Ref.on('value', snap => txt3.innerHTML = snap.val());
 txt4Ref.on('value', snap => txt4.innerHTML = snap.val());
 txt5Ref.on('value', snap => txt5.innerHTML = snap.val());
 txt6Ref.on('value', snap => txt6.innerHTML = snap.val());
 txt7Ref.on('value', snap => txt7.innerHTML = snap.val());
 txt8Ref.on('value', snap => txt8.innerHTML = snap.val());
 txt9Ref.on('value', snap => txt9.innerHTML = snap.val());
 txt10Ref.on('value', snap => txt10.innerHTML = snap.val());
 txt11Ref.on('value', snap => txt11.innerHTML = snap.val());
 txt12Ref.on('value', snap => txt12.innerHTML = snap.val());


 greeting();
 var cIndex = 0,
     maxIndex = 12;

 function removeImg() {
     $(".removeImg").fadeOut('slow');
     setTimeout(function () {
         $(".removeImg").remove();
     }, 1000);
 }

 setTimeout(removeImg, 4470);

 function removeTxt(id) {
     var idTxt = 'txt' + id;
     var nextIdTxt = 'txt' + (id + 1);
     $("#" + idTxt).fadeOut('slow');
     console.log(idTxt);
     $("#" + nextIdTxt).fadeIn('slow');

 }

 var stopInterval;
 stopInterval = setInterval(function () {
     if (cIndex == maxIndex) {
         clearInterval(stopInterval);
     }
     removeTxt(cIndex);

     cIndex++;
 }, 4800);

 function greeting() {
     var getName =  document.location.pathname.match(/[^\/]+$/)[0];
     var myFilename = getPageName(getName).toUpperCase();
     $('.greeting').css('text-transform', 'capitalize');
     var thehours = new Date().getHours();
     var themessage;
     var morning = ('Good Morning ' + myFilename);
     var afternoon = ('Good Afternoon ' + myFilename);
     var evening = ('Good Evening ' + myFilename);
     var night = ('Good Night ' + myFilename);

     if (thehours >= 3 && thehours < 12) {
         themessage = morning;

     } else if (thehours >= 12 && thehours < 17) {
         themessage = afternoon;

     } else if (thehours >= 17 && thehours < 22) {
         themessage = evening;
     } else if (thehours >= 22 && thehours < 24) {
         themessage = night;
     } else if (thehours >= 0 && thehours < 3) {
         themessage = night;
     }

     $('.greeting').append(themessage);
 }

 function getPageName(url) {
     var index = url.lastIndexOf("/") + 1;
     var filenameWithExtension = url.substr(index);
     var filename = filenameWithExtension.split(".")[0]; // <-- added this line
     return filename; // <-- added this line
 }
