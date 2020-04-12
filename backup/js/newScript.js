/*jslint browser: true*/
/*global $*/
/*eslint-env browser*/

function addGuest() {
    var totalGuest = $("#totalGuest").val();
    if (parseInt(totalGuest, 10) < 15) {
        totalGuest = parseInt(totalGuest, 10) + 1;
        $(".user" + totalGuest).removeClass("disabled");
        $("#totalGuest").val(totalGuest);
        M.updateTextFields();
    }
}

function removeGuest() {
    var totalGuest = $("#totalGuest").val();
    if (parseInt(totalGuest, 10) > 1) {
        totalGuest = parseInt(totalGuest, 10) - 1;
        if ((totalGuest + 1) != 1) {
            $(".user" + (totalGuest + 1)).addClass("disabled");
        }
        $("#totalGuest").val(totalGuest);
        M.updateTextFields();
    }
}

function addVehicle() {
    var totalGuest = $("#totalCar").val();
    if (parseInt(totalGuest, 10) < 15) {
        totalGuest = parseInt(totalGuest, 10) + 1;
        $(".car" + totalGuest).removeClass("disabled");
        $("#totalCar").val(totalGuest);
        M.updateTextFields();
    }
}

function removeVehicle() {
    var totalGuest = $("#totalCar").val();
    if (parseInt(totalGuest, 10) > 1) {
        totalGuest = parseInt(totalGuest, 10) - 1;
        if ((totalGuest + 1) != 1) {
            $(".car" + (totalGuest + 1)).addClass("disabled");
        }
        $("#totalCar").val(totalGuest);
        M.updateTextFields();
    }
}

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function datediff(first, second) {
    first = parseDate(first);
    second = parseDate(second);
    var days = Math.round(Math.abs((second.getTime() - first.getTime()) / (86400000)));
    var stay = 1;
    if (days === 0) {
        stay = 1;
    } else {
        stay = days;
    }
    return stay;
}


function toggleNextDiv(context) {
    var id = $(context).closest('.mainDiv').attr('id');
    var index = divIds.indexOf(id);
    $('#' + id).slideToggle();
    $('#' + divIds[index + 1]).slideToggle();
}

function togglePrevDiv(context) {
    var id = $(context).closest('.mainDiv').attr('id');
    var index = divIds.indexOf(id);
    $('#' + id).slideToggle();
    $('#' + divIds[index - 1]).slideToggle();
}

function foodCost(breakfast, lunch, dinner, stay) {
    breakfast = parseInt(breakfast, 10);
    lunch = parseInt(lunch, 10);
    dinner = parseInt(dinner, 10);
    var foodPrice = (breakfast + lunch + dinner) * stay;
    $('#totalFood').html(foodPrice);
    return foodPrice;
}

function hotelCost(hotelCost, stay, people) {
    var hotelPrice = Math.round((parseInt(hotelCost, 10) * stay) / parseInt(people, 10));
    $('#totalHotel').html(hotelPrice);
    return hotelPrice;
}

function privateVehicleCost(totalVehicle, KM, pdAvg, rate) {
    var roundTripKM = parseInt(KM, 10) * 2;
    pdAvg = parseInt(pdAvg, 10);
    rate = parseInt(rate, 10);
    var oneVehicleCost = (roundTripKM / pdAvg) * rate;
    var totalVehicleCost = Math.round(oneVehicleCost * totalVehicle);
    $('#totalTrasportation').html(totalVehicleCost);
    return totalVehicleCost;
}

function publicVehicleCost(TicketPrice, returnTicketPrice) {
    var totalVehicleCost = Math.round(parseInt(TicketPrice, 10) + parseInt(returnTicketPrice, 10));
    $('#totalTrasportation').html(totalVehicleCost);
    return totalVehicleCost;
}


$(document).ready(function () {
    "use strict";
    $('select').formSelect();
    $('#startingDate').datepicker({
        format: "mm/dd/yyyy",
        autoClose: true,
        minDate: new Date(),
        onSelect: function (date) {
            $("#endingDate").prop('disabled', false);
            $('#endingDate').datepicker({
                format: "mm/dd/yyyy",
                autoClose: true,
                minDate: date,
                onSelect: function () {
                    $('#2').attr('onclick', 'toggleNextDiv(this)');
                }
            });
        }
    });

    $('input.autocomplete').autocomplete({
        onAutocomplete: function () {
            getletlong(this)
        },
    });

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.collapsible').collapsible();
    $('.tabs').tabs();
    //display icon         
    $(".icon").each(function () {
        var icon = $(this).html();
        $(this).html('<img src="https://png.icons8.com/color/' + icon + '">');
    });

});
var divIds = ["userDiv", "daysDiv", "extraDiv"];
$('.switcher').change(function () {
    if ($('.switcher:checked').length > 0) {
        $('.addFinish').attr('onclick', 'toggleNextDiv(this)');
        $('.addFinish').click(function () {
            $('#' + divIds[divIds.length - 1] + ' .btn').html('Finish');
        });
    } else {
        $('.addFinish').attr('onclick', '');
        $(".addFinish").unbind("click");
    }
    if ($(this).prop("checked") === true) {
        switch (this.id) {
            case "hotelEnable":
                divIds.push('hotelDiv');
                break;
            case "vehicleEnable":
                divIds.push('vehicleDiv');
                break;
            case "foodEnable":
                divIds.push('foodDiv');
                break;
        }
    } else {
        switch (this.id) {
            case "hotelEnable":
                removeArrayElement(divIds, 'hotelDiv');
                break;
            case "vehicleEnable":
                removeArrayElement(divIds, 'vehicleDiv');
                break;
            case "foodEnable":
                removeArrayElement(divIds, 'foodDiv');
                break;
        }
    }
});

$('.vehicleType').change(function () {
    if (this.id == 'car') {
        $('.privateVehicle').slideToggle();
    } else {
        $('.privateVehicle').slideToggle();
    }

    if (this.id == 'diffVehicle') {
        $('.publicVehicle').slideToggle();
    } else {
        $('.publicVehicle').slideToggle();
    }

});



$('#hotelDiv input').keyup(function () {
    if ($(this).val()) {
        if (divIds.indexOf('hotelDiv') != divIds.length - 1) {
            $('#hotelDiv .next').attr('onclick', 'toggleNextDiv(this)');
        } else {
            $('#hotelDiv .next').attr('onclick', 'finish(this)');
        }
    } else {
        $('#hotelDiv .next').attr('onclick', '');
    }
});

$('#foodDiv input').keyup(function () {
    if ($('#rateBreakfast').val() && $('#rateLunch').val() && $('#rateDinner').val()) {
        if (divIds.indexOf('foodDiv') != divIds.length - 1) {
            $('#foodDiv .next').attr('onclick', 'toggleNextDiv(this)');
        } else {
            $('#foodDiv .next').attr('onclick', 'finish(this)');
        }
    } else {
        $('#foodDiv .next').attr('onclick', '');
    }
});

$('#vehicleDiv input').keyup(function () {
    var idVehicle = $('li .active').attr("id");
    switch (idVehicle) {
        case 'car':
            if ($('#rate').val() && $('#km').val() && $('#pdAvg').val()) {
                if (divIds.indexOf('vehicleDiv') != divIds.length - 1) {
                    $('#vehicleDiv .next').attr('onclick', 'toggleNextDiv(this)');
                } else {
                    $('#vehicleDiv .next').attr('onclick', 'finish(this)');
                }
            } else {
                $('#vehicleDiv .next').attr('onclick', '');
            }
            break;
        case 'diffVehicle':
            if ($('#ticketPrice').val() && $('#returnTicketPrice').val()) {
                if (divIds.indexOf('vehicleDiv') != divIds.length - 1) {
                    $('#vehicleDiv .next').attr('onclick', 'toggleNextDiv(this)');
                } else {
                    $('#vehicleDiv .next').attr('onclick', 'finish(this)');
                }
            } else {
                $('#vehicleDiv .next').attr('onclick', '');
            }
            break;
    }

});

function removeArrayElement(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

function finish(context) {
    var id = $(context).closest('.mainDiv').attr('id');
    var index = divIds.indexOf(id);
    $('#' + id).slideToggle();
    $('#endDiv').slideToggle();
    var hotelBudget = 0,
        vehicleBudget = 0,
        foodBudget = 0;
    //total Adults
    var totalAdults = parseInt($('#totalGuest').val(), 10);
    var exMoney = parseInt($('#exMoney').val(), 10);

    //Days
    var startingDate = $('#startingDate').val();
    var endingDate = $('#endingDate').val();
    var stay = datediff(startingDate, endingDate);

    //Hotel 
    if ($('#hotelEnable').prop("checked") === true) {
        var hotelPrice = $('#hotelPrice').val();
        hotelBudget = hotelCost(hotelPrice, stay, totalAdults);
    }

    //Vehicle
    if ($('#vehicleEnable').prop("checked") === true) {
        var idVehicle = $('li .active').attr("id");
        switch (idVehicle) {
            case 'car':
                var totalVehicle = $("#totalCar").val();
                var KM = $("#km").val();
                var pdAvg = $("#pdAvg").val();
                var rate = $("#rate").val();
                vehicleBudget = privateVehicleCost(totalVehicle, KM, pdAvg, rate);
                break;
            case 'diffVehicle':
                var TicketPrice = $("#ticketPrice").val();
                var returnTicketPrice = $("#returnTicketPrice").val();
                vehicleBudget = publicVehicleCost(TicketPrice, returnTicketPrice);
                break;
        }
    }

    //Food
    if ($('#foodEnable').prop("checked") === true) {
        var breakfast = $("#rateBreakfast").val();
        var lunch = $("#rateLunch").val();
        var dinner = $("#rateDinner").val();
        foodBudget = foodCost(breakfast, lunch, dinner, stay);
    }
    $('#extraMoney').html(exMoney);
    var perPersonCost = hotelBudget + vehicleBudget + foodBudget + exMoney;
    $('#total').html(perPersonCost);
    var totalCost = perPersonCost * totalAdults;
    $('#totalBudget').html(totalCost);

}
