//
function saveTrip() {
    var name = $('#trip_name').val();
    firebase.auth().onAuthStateChanged(function (user) {
        var userId = user.uid;
        var email = user.email;
        firebase.database().ref('users/' + userId + '/saveTrip/' + name).set({
            totalAdults: textValue('totalAdults'),
            exMoney: textValue('exMoney'),
            startingDate: textValue('startingDate'),
            endingDate: textValue('endingDate'),
            hotel:chackBoxCheck('hotelEnable'),
            vehicle:chackBoxCheck('vehicleEnable'),
            food:chackBoxCheck('foodEnable')
        });
    });
}

$('#trip_name').keyup(function () {
    var name = $('#trip_name').val();
    firebase.auth().onAuthStateChanged(function (user) {
        firebase.database().ref('users/' + user.uid + '/saveTrip/' + name).on("value", function (snapshot) {
            if (snapshot.numChildren() > 0) {
                $("#saveTripBtn").attr("onclick", "");
                $("#saveTripBtn").addClass("disabled");
                $("#errorSave").html("already exist");
            } else {
                $("#saveTripBtn").attr("onclick", "saveTrip()");
                $("#saveTripBtn").removeClass("disabled");
                $("#errorSave").html("");
            }
        });
    });
});

function textValue(id) {
    var value = $('#' + id).val();
    return value;
}

console.log();

function chackBoxCheck(id) {
    if ($('#' + id).prop("checked") === true) {
      return true;
    } else if ($('#' + id).prop("checked") === false) {
        return false;
    }
}
