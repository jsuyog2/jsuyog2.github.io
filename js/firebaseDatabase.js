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
            hotelcheck: chackBoxCheck('hotelEnable'),
            vehiclecheck: chackBoxCheck('vehicleEnable'),
            foodcheck: chackBoxCheck('foodEnable')
        });
        if (chackBoxCheck('hotelEnable') == true) {
            firebase.database().ref('users/' + userId + '/saveTrip/' + name + '/hotel').set({
                price: textValue('hotelPrice')
            });
        }
        if (chackBoxCheck('vehicleEnable') == true) {
            if ($('#car').prop("checked") === true) {
                var total = {
                    vehicleType:1,
                    totalCar: textValue('totalBikesCar'),
                    Avg: textValue('pdAvg'),
                    km: textValue('km'),
                    rate: textValue('rate')
                }
            } else if ($('#diffVehicle').prop("checked") === true) {
                var total ={
                    vehicleType:2,
                    ticketPrice:textValue('ticketPrice'),
                    returnTicketPrice:textValue('returnTicketPrice')
                }
            }
            firebase.database().ref('users/' + userId + '/saveTrip/' + name + '/vehicle').set(total);
        }
        if (chackBoxCheck('foodEnable') == true) {
            firebase.database().ref('users/' + userId + '/saveTrip/' + name + '/food').set({
                Breakfast: textValue('rateBreakfast'),
                Lunch: textValue('rateLunch'),
                Dinner: textValue('rateDinner')
            });
        }
    });
}

$('#trip_name').keyup(function () {
    var name = $('#trip_name').val();
    firebase.auth().onAuthStateChanged(function (user) {
        firebase.database().ref('users/' + user.uid + '/saveTrip/' + name).on("value", function (snapshot) {
            if (snapshot.numChildren() > 0) {
                $("#saveTripBtn").html("UPDATE");
            } else {
                $("#saveTripBtn").html("SAVE");
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
