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
    return Math.round(Math.abs((second.getTime() - first.getTime()) / (86400000)));
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
    //display icon         
    $(".icon").each(function () {
        var icon = $(this).html();
        $(this).html('<img src="https://png.icons8.com/color/' + icon + '">');
    });

    var totalAdults = 0,
        startingDate = "",
        endingDate = "",
        hotel = false,
        vehicle = false,
        food = false;
    $('#mainNextDiv1').click(function () {
        $('#mainDiv1').slideToggle();
        $('#mainDiv2').slideToggle();
    });
    $('#mainDiv1Back').click(function () {
        $('#mainDiv1').slideToggle();
        $('#mainDiv2').slideToggle();
    });
    $('#mainNextDiv2').click(function () {
        startingDate = $('#startingDate').val();
        endingDate = $('#endingDate').val();
        if (startingDate !== "" && endingDate !== "") {
            $('#mainDiv2').slideToggle();
            $('#mainDiv3').slideToggle();
        }
    });
    $('#mainDiv2Back').click(function () {
        $('#mainDiv2').slideToggle();
        $('#mainDiv3').slideToggle();
    });
    $('#mainNextDiv3').click(function () {
        var checkBoxs = [];
        hotel = $('#hotelEnable').prop("checked");
        vehicle = $('#vehicleEnable').prop("checked");
        food = $('#foodEnable').prop("checked");
        if (hotel === true) {
            checkBoxs.push('hotel');
        }
        if (vehicle === true) {
            checkBoxs.push('vehicle');
        }
        if (food === true) {
            checkBoxs.push('food');
        }
        $('#mainDiv3').slideToggle();
        addDetails(totalAdults, startingDate, endingDate, checkBoxs);
    });
});


function addDetails(totalAdults, startingDate, endingDate, checkBoxs) {
    var i = 0;
    var perPersonCostPerDay = 0,
        totalCost = 0,
        stay = 0,
        hotelPrice = 0,
        breakfast = 0,
        lunch = 0,
        dinner = 0,
        foodPrice = 0,
        car = false,
        diffVehicle = false,
        totalBikesCar = 0,
        fromPlace = '',
        toPlace = '',
        km = 0,
        pdAvg = 0,
        rate = 0,
        TicketPrice = 0,
        returnTicketPrice = 0,
        totalVehicleCost = 0;
    $('#' + checkBoxs[i]).slideToggle();
    days = datediff(startingDate, endingDate);
    if (days === 0) {
        stay = 1;
    } else {
        stay = days;
    }
    if (i === checkBoxs.length - 1) {
        $('#' + checkBoxs[i] + 'Next').html('Finish');
        $('#' + checkBoxs[i] + 'Next').addClass('Finish');
    }
    $('.next').click(function () {
        i++;
        if (this.id === 'hotelNext') {
            hotelPrice = (parseInt($('#hotelPrice').val(), 10) * stay) / totalAdults;
        }
        if (this.id === 'foodNext') {
            breakfast = parseInt($("#rateBreakfast").val(), 10);
            lunch = parseInt($("#rateLunch").val(), 10);
            dinner = parseInt($("#rateDinner").val(), 10);
            foodPrice = (breakfast + lunch + dinner) * stay;
        }
        if (this.id === 'vehicleNext') {
            car = $('#car').prop("checked"), 10;
            diffVehicle = $('#diffVehicle').prop("checked");
            var index = checkBoxs.indexOf("vehicle");
            if (car === true) {
                checkBoxs.splice(index + 1, 0, "totalCarDiv", "destinationDiv", "carEstimDiv");
            }
            if (diffVehicle === true) {
                checkBoxs.splice(index + 1, 0, "diffVehiDiv");
            }
        }
        if (car === true) {
            if (this.id === 'totalCarNext') {
                totalBikesCar = parseInt($("#totalCar").val(), 10);
            }
            if (this.id === 'destinationNext') {
                fromPlace = $('#autocomplete-input1').val();
                toPlace = $('#autocomplete-input2').val();
            }
            if (this.id === 'carEstimDivNext') {
                km = parseInt($("#km").val(), 10);
                pdAvg = parseInt($("#pdAvg").val(), 10);
                rate = parseInt($("#rate").val(), 10);
            }
            totalVehicleCost = Math.round((((((km * 2) / pdAvg) * rate) / totalAdults) * totalBikesCar));
        }
        if (diffVehicle === true) {
            if (this.id === 'diffVehiDivNext') {
                TicketPrice = parseInt($("#ticketPrice").val(), 10);
                returnTicketPrice = parseInt($("#returnTicketPrice").val(), 10);
                totalVehicleCost = Math.round(TicketPrice + returnTicketPrice);
            }
        }
        perPersonCostPerDay = hotelPrice + foodPrice + totalVehicleCost;
        if (i < checkBoxs.length) {
            $('#' + checkBoxs[i - 1]).slideToggle();
            $('#' + checkBoxs[i]).slideToggle();
        }
        if (i === checkBoxs.length - 1) {
            $('#' + checkBoxs[i] + 'Next').html('Finish');
            $('#' + checkBoxs[i] + 'Next').addClass('Finish');
        }
    });
    $('.Finish').click(function () {
        $('#' + checkBoxs[checkBoxs.length - 1]).slideToggle();
        $('#endDiv').slideToggle();
        totalCost = perPersonCostPerDay * totalAdults;
        $('#totalBudget').html(totalCost);
        $('#total').html(perPersonCostPerDay);
        $('#totalFood').html(foodPrice);
        $('#totalTrasportation').html(totalVehicleCost);
        $('#totalHotel').html(hotelPrice);
    });
}

var divIds = ["userDiv","daysDiv","extraDiv"];
$('.switcher').change(function () {
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

function removeArrayElement(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

$('.btn').click(function () {
    var id = parseInt(this.id, 10);
    switch (id) {
        case 1:
            totalAdults = parseInt($('#totalGuest').val(), 10);
            break;
        case 2:
            startingDate = $('#startingDate').val();
            endingDate = $('#endingDate').val();
            break;
        case 3:
            hotel = $('#hotelEnable').prop("checked");
            vehicle = $('#vehicleEnable').prop("checked");
            food = $('#foodEnable').prop("checked");
            break;
    }
});

function toggleNextDiv(context) {
    var id = $(context).closest('.mainDiv').attr('id');
    var index = divIds.indexOf(id);
    $('#'+id).slideToggle();
    $('#'+divIds[index+1]).slideToggle();
}

function togglePrevDiv(context) {
    var id = $(context).closest('.mainDiv').attr('id');
    var index = divIds.indexOf(id);
    $('#'+id).slideToggle();
    $('#'+divIds[index-1]).slideToggle();
}

function foodCost(breakfast, lunch, dinner, stay) {
    breakfast = parseInt(breakfast, 10);
    lunch = parseInt(lunch, 10);
    dinner = parseInt(dinner, 10);
    var foodPrice = (breakfast + lunch + dinner) + stay;
    return foodPrice;
}

function hotelCost(hotelCost, stay) {
    var hotelPrice = (hotelCost, 10) * stay;
    return hotelPrice;
}

function privateVehicleCost(totalVehicle, KM, pdAvg, rate) {
    var roundTripKM = parseInt(KM, 10) * 2;
    pdAvg = parseInt(pdAvg, 10);
    rate = parseInt(rate, 10);
    var oneVehicleCost = (roundTripKM / pdAvg) * rate;
    var totalVehicleCost = Math.round(oneVehicleCost * totalVehicle);
    return totalVehicleCost;
}

function publicVehicleCost(TicketPrice, returnTicketPrice) {
    var totalVehicleCost = Math.round(TicketPrice + returnTicketPrice);
    return totalVehicleCost;
}
