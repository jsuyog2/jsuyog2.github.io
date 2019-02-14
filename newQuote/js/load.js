

 var title = document.getElementById("title");
 var tagline = document.getElementById("tagline");


 var titleRef = database.ref().child('index/title');
 var taglineRef = database.ref().child('index/tagline');



 titleRef.on('value', snap => title.innerHTML = snap.val());
 taglineRef.on('value', snap => tagline.innerHTML = snap.val());




