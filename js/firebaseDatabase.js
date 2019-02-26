//save trip
function saveTrip() {
    var name = $('#trip_name').val();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var email = user.email;
    firebase.database().ref('users/' + userId + '/saveTrip/' + name).set({
        totalAdults: textValue('totalAdults'),
        exMoney: textValue('exMoney'),
        startingDate: textValue('startingDate'),
        endingDate: textValue('endingDate'),
        hotelcheck: chackBoxCheck('hotelEnable'),
        vehiclecheck: chackBoxCheck('vehicleEnable'),
        foodcheck: chackBoxCheck('foodEnable'),
        total: $('#totalBudget').html()
    });
    if (chackBoxCheck('hotelEnable') == true) {
        firebase.database().ref('users/' + userId + '/saveTrip/' + name + '/hotel').set({
            price: textValue('hotelPrice')
        });
    }
    if (chackBoxCheck('vehicleEnable') == true) {
        if ($('#car').prop("checked") === true) {
            var total = {
                vehicleType: 1,
                totalCar: textValue('totalBikesCar'),
                Avg: textValue('pdAvg'),
                km: textValue('km'),
                rate: textValue('rate')
            }
        } else if ($('#diffVehicle').prop("checked") === true) {
            var total = {
                vehicleType: 2,
                ticketPrice: textValue('ticketPrice'),
                returnTicketPrice: textValue('returnTicketPrice')
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
}
$(document).ready(function () {
    if ($("#allTrip").length != 0) {
        firebase.auth().onAuthStateChanged(function (user) {
            firebase.database().ref('users/' + user.uid + '/saveTrip').on("value", function (snapshot) {
                $('#allTrip').empty();
                snapshot.forEach(function (childSnapshot) {
                    cardDisplay(childSnapshot);
                });
            });
        });
    }
});

function cardDisplay(childSnapshot) {

    var open = '<div class="col l4 s12"><div class="card"><div class="card-content"><p><span class="card-title"><b>' + childSnapshot.key + '</b></span></p><p>' + childSnapshot.val().total + '</p></div><div class="card-action"><a class="btn modal-trigger" href="#' + childSnapshot.key + '">Open</a></div></div></div>';
    $('#allTrip').append(open);
var model = '';
    model += '<div id="' + childSnapshot.key + '" class="modal"><div class="modal-content"><h4>' + childSnapshot.key + '</h4><p>';
        
        
        
    
        
        
        model +='</p></div><div class="modal-footer"><a class="modal-close waves-effect waves-green btn-flat">Close</a></div></div><script>$(".modal").modal();</script>';
    $('#allModels').append(model);
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

function chackBoxCheck(id) {
    if ($('#' + id).prop("checked") === true) {
        return true;
    } else if ($('#' + id).prop("checked") === false) {
        return false;
    }
}
