var txt1 = "Beginning today,",
    txt2 = "treat everyone you meet as",
    txt3 = "if they were going to be dead by",
    txt4 = "midnight.",
    txt5 = "Extend to them",
    txt6 = "all the care,",
    txt7 = "kindness and understanding you",
    txt8 = "can muster,and",
    txt9 = "do it with no thought of",
    txt10 = "any reward.",
    txt11 = "Your life will never be",
    txt12 = "the same again.";

$('#txt1').html(txt1);
$('#txt2').html(txt2);
$('#txt3').html(txt3);
$('#txt4').html(txt4);
$('#txt5').html(txt5);
$('#txt6').html(txt6);
$('#txt7').html(txt7);
$('#txt8').html(txt8);
$('#txt9').html(txt9);
$('#txt10').html(txt10);
$('#txt11').html(txt11);
$('#txt12').html(txt12);

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
    var getName = document.location.pathname.match(/[^\/]+$/)[0];
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
