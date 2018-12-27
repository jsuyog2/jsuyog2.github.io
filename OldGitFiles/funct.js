
if(index == true){
var check1 = "red";
var check2 = "blue";
var check3 = "love";
var check4 = "you";
}
else{
var check1 = "A";
var check2 = "B";
var check3 = "C";
var check4 = "D";
}
var dt = new Date();
function removeImg() {
    $(".removeImg").fadeOut("slow");;
    $('.showHide1').fadeIn("slow");;
}

setTimeout(removeImg, 8940);

$("#click").click(function () {
    $("#tapTo").fadeOut("slow");
    setTimeout(textslide, 100);
});

$("#txtIn3").keyup(function () {
    var txtIn3 = $(this).val();
    if (txtIn3.toUpperCase() == check1.toUpperCase()) {
        setTimeout(textslide2, 100);
    }
});

$("#txtIn6").keyup(function () {
    var txtIn6 = $(this).val();
    if (txtIn6.toUpperCase() == check2.toUpperCase()) {
        $('.showHide1').fadeOut("slow");
        $('.showHide2').show();
         setTimeout(textslide3, 100);
    }
});
$("#txtIn9").keyup(function () {
    var txtIn9 = $(this).val();
    if (txtIn9.toUpperCase() == check3.toUpperCase()) {
        setTimeout(textslide4, 100);
    }
});
$("#txtIn12").keyup(function () {
    var txtIn12 = $(this).val();
    if (txtIn12.toUpperCase() == check4.toUpperCase()) {
        $('.showHide1').fadeOut("slow");
        $('.showHide2').fadeOut("slow");
        setTimeout(function(){
         $('.showHide3').show();
        }, 300);


    }
});


//removeImg();

function textslide() {
    textID = ["txt1", "txt2", "txt3"];
    var t = 0;
    setInterval(function () {
        var x = document.getElementById(textID[t]);
        $(x).css({
            top: 0,
            opacity: 0
        }).
        animate({
            top: 50,
            opacity: 1
        }, 'slow');
        t++;
    }, 500);


}
function textslide2() {
    textID = ["txt4", "txt5", "txt6"];
    var t = 0;
    setInterval(function () {
        var x = document.getElementById(textID[t]);
        $(x).css({
            top: 0,
            opacity: 0
        }).
        animate({
            top: 50,
            opacity: 1
        }, 'slow');
        t++;
    }, 500);


}
function textslide3() {
    textID = ["txt7", "txt8", "txt9"];
    var t = 0;
    setInterval(function () {
        var x = document.getElementById(textID[t]);
        $(x).css({
            top: 0,
            opacity: 0
        }).
        animate({
            top: 50,
            opacity: 1
        }, 'slow');
        t++;
    }, 500);


}
function textslide4() {
    textID = ["txt10", "txt11", "txt12"];
    var t = 0;
    setInterval(function () {
        var x = document.getElementById(textID[t]);
        $(x).css({
            top: 0,
            opacity: 0
        }).
        animate({
            top: 50,
            opacity: 1
        }, 'slow');
        t++;
    }, 500);


}
greeting();
function greeting(){
    var thehours = new Date().getHours();
	var themessage;
	var morning = ('Good Morning');
	var afternoon = ('Good Afternoon');
    var evening = ('Good Evening');
    var night = ('Good Night');

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
