

 var txt1 = document.getElementById("txt1");


 var txt1Ref = database.ref().child('txt1');



 txt1Ref.on('value', snap => txt1.innerHTML = snap.val());




