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
                $('#allModels').empty();
                snapshot.forEach(function (childSnapshot) {
                    cardDisplay(childSnapshot);
                });
                $(".icon").each(function () {
                    var icon = $(this).html();
                    $(this).html('<img src="https://png.icons8.com/color/' + icon + '">');
                });
            });
        });
    }
});

function cardDisplay(childSnapshot) {

    var open = '<div class="col l4 s12"><div class="card"><div class="card-content"><p><span class="card-title"><b>' + childSnapshot.key + '</b></span></p><p>' + childSnapshot.val().total + '</p></div><div class="card-action"><a class="btn modal-trigger" style="margin-right:5px;" href="#' + childSnapshot.key + '">Open</a><a class="btn red" onclick="deleteRecord(' + childSnapshot.key + ')">Delete</a></div></div></div>';
    $('#allTrip').append(open);
    var model = '';
    model += '<div id="' + childSnapshot.key + '" class="modal"><div class="modal-header right"><a class="modal-close waves-effect waves-green btn-flat "> <i class="material-icons">close</i></a></div><div class="modal-content"><h4>' + childSnapshot.key + '</h4><p>';

    model += '<div class="row"><div class="col l4 s12"><div class="col s4 l12"><div class="icon">crowd</div><div class="costTitle">Total People</div></div><div class="col s8 l12"><b class="cost" id="totalBudget">' + childSnapshot.val().totalAdults + '</b></div></div><div class="col l4 s12"><div class="col s4 l12"><div class="icon">date-to</div><div class="costTitle">Date From</div> </div><div class="col s8 l12"><b class="cost" id="total">' +  childSnapshot.val().startingDate+ '</b></div> </div><div class="col l4 s12"> <div class="col s4 l12"><div class="icon">date-from</div><div class="costTitle">Date To</div></div><div class="col s8 l12"><b class="cost" id="extraMoney">' + childSnapshot.val().endingDate + '</b></div></div></div>';  
    
    model += '<div class="row"><div class="col l4 s12"><div class="col s4 l12"><div class="icon">bill</div><div class="costTitle">Total Budget</div></div><div class="col s8 l12">₹<b class="cost" id="totalBudget">' + childSnapshot.val().total + '</b></div></div><div class="col l4 s12"><div class="col s4 l12"><div class="icon">refund</div><div class="costTitle">Total</div> </div><div class="col s8 l12">₹<b class="cost" id="total">' + (childSnapshot.val().total / childSnapshot.val().totalAdults) + '</b>/Person</div> </div><div class="col l4 s12"> <div class="col s4 l12"><div class="icon">rupee</div><div class="costTitle">Extra Money</div></div><div class="col s8 l12">₹<b class="cost" id="extraMoney">' + childSnapshot.val().exMoney + '</b>/Person </div></div></div>';
    if (childSnapshot.val().hotelcheck == true || childSnapshot.val().vehiclecheck == true || childSnapshot.val().foodcheck == true) {
        model += '<ul class="collapsible">';
        if (childSnapshot.val().hotelcheck == true) {
            model += '<li><div class="collapsible-header"><div class="icon">hotel-information</div><div class="costTitle">Hotel:</div></div><div class="collapsible-body"><span><div class="col s8 l12"><div class="costTitle">Total:</div>₹<b class="cost" id="totalHotel">' + childSnapshot.val().hotel.price + '</b>/Night</div> </span></div></li>';
        }

        if (childSnapshot.val().vehiclecheck == true) {
            model += '<li><div class="collapsible-header"><div class="icon">gas-station</div><div class="costTitle">Trasportation</div></div> <div class="collapsible-body"><span>';
            switch (childSnapshot.val().vehicle.vehicleType) {
                case 1:
                    model += '<div class="costTitle">Trasportation Type: Car/Bike</div>';
                    model += '<div class="costTitle">Total Vehicle:' + childSnapshot.val().vehicle.totalCar + '</div>';
                    totalVehicleCost = Math.round(((((parseInt(childSnapshot.val().vehicle.km) * 2) / parseInt(childSnapshot.val().vehicle.Avg)) * parseInt(childSnapshot.val().vehicle.rate)) / parseInt(childSnapshot.val().totalAdults, 10)) * parseInt(childSnapshot.val().vehicle.totalCar, 10))
                    model += '<div class="costTitle">Total: </div>';
                    model += '<div class="col s8 l12">₹<b class="cost" id="totalTrasportation">' + totalVehicleCost + '</b>/Person</div>';
                    model += '<div class="row"><div class="col s12 l4"><div class="costTitle">Total Km of One Way:</div>₹<b class="cost" id="totalTrasportation">' + childSnapshot.val().vehicle.km + '</b>/Km</div><div class="col s12 l4"><div class="costTitle">Petrol/Diesel Avg. km/l:</div>₹<b class="cost" id="totalTrasportation">' + childSnapshot.val().vehicle.Avg + '</b>km/l</div><div class="col s12 l4"><div class="costTitle">Petrol/Diesel Rate:</div>₹<b class="cost" id="totalTrasportation">' + childSnapshot.val().vehicle.rate + '</b>/l</div></div>';

                    break;
                case 2:
                    model += '<div class="costTitle">Trasportation Type: Bus/Train/Flight</div>';
                    totalVehicleCost = Math.round(parseInt(childSnapshot.val().vehicle.ticketPrice, 10) + parseInt(childSnapshot.val().vehicle.returnTicketPrice, 10));
                    model += '<div class="costTitle">Total: </div>';
                    model += '<div class="col s8 l12">₹<b class="cost" id="totalTrasportation">' + totalVehicleCost + '</b>/Person</div>';
                    model += '<div class="row"><div class="col s12 l4"><div class="costTitle">Ticket Price From Origin to Destination:</div>₹<b class="cost" id="totalTrasportation">' + childSnapshot.val().vehicle.ticketPrice + '</b>/Person</div><div class="col s12 l4"><div class="costTitle">Ticket Price From Destination to Origin:</div>₹<b class="cost" id="totalTrasportation">' + childSnapshot.val().vehicle.returnTicketPrice + '</b>/Person</div></div>';
                    break;
            }


            model += '</span></div></li>';
        }

        if (childSnapshot.val().foodcheck == true) {
            model += '<li> <div class="collapsible-header"><div class="icon">dining-room</div><div class="costTitle">Food</div></div><div class="collapsible-body"><span> <div class="row"><div class="costTitle">Total:</div>₹<b class="cost" id="totalFood">' + (parseInt(childSnapshot.val().food.Breakfast) + parseInt(childSnapshot.val().food.Dinner) + parseInt(childSnapshot.val().food.Lunch)) + '</b>/Person</div>';



            model += '<div class="row"><div class="col s12 l4"><div class="costTitle">Breakfast:</div>₹<b class="cost" id="totalFood">' + childSnapshot.val().food.Breakfast + '</b>/Person</div><div class="col s12 l4"><div class="costTitle">Lunch:</div>₹<b class="cost" id="totalFood">' + childSnapshot.val().food.Lunch + '</b>/Person</div><div class="col s12 l4"><div class="costTitle">Dinner:</div>₹<b class="cost" id="totalFood">' + childSnapshot.val().food.Dinner + '</b>/Person</div></div></span></div> </li> </ul> ';
        }
    }



    model += '</p></div></div><script>$(".modal").modal();$(".collapsible").collapsible();</script>';
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

function deleteRecord(name){
    
}

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
