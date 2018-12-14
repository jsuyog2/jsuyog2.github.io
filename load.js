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
var cIndex = 0,
    maxIndex = 12;
var stopInterval;
stopInterval = setInterval(function () {
    if (cIndex == maxIndex) {
        clearInterval(stopInterval);
    }
    removeTxt(cIndex);

    cIndex++;
}, 4800);
greeting();
function greeting() {
    var getName = document.location.pathname.match(/[^\/]+$/)[0];
    var myFilename = getPageName(getName);
    myFilename = myFilename.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
    });
    console.log(myFilename);
    var thehours = new Date().getHours();
    var themessage;
    var morning = ('Good Morning '+myFilename);
    var afternoon = ('Good Afternoon '+myFilename);
    var evening = ('Good Evening '+myFilename);
    var night = ('Good Night '+myFilename);

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
    return filename;                                    // <-- added this line
}