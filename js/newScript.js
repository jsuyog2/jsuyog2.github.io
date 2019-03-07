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
                minDate: date
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
        totalAdults = parseInt($('#totalGuest').val(), 10);
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
    console.log(i);
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
        console.log(this.id);
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

$(document).ready(function () {



    //submit click
    $("#submit").click(function () {
        //People
        totalAdults = $("#totalAdults").val();
        startingDate = $('#startingDate').val();
        endingDate = $('#endingDate').val();
        extraMoney = $('#exMoney').val();


        if (totalAdults !== null && startingDate !== "" && endingDate !== "" && extraMoney !== "") {
            $('#error').html("");
            $('.modal').modal();
            //days

            days = datediff(startingDate, endingDate);
            if (days === 0) {
                stay = 1;
            } else {
                stay = days;
            }

            //hotel
            if ($("#hotelEnable").prop("checked") === false) {
                hotelPricePerPerson = 0;

            } else if ($("#hotelEnable").prop("checked") === true) {
                hotelPrice = $("#hotelPrice").val();
                if (hotelPrice !== null || hotelPrice !== "") {
                    hotelPricePerDay = hotelPrice * stay;
                    hotelPricePerPerson = Math.round(hotelPricePerDay / totalAdults);
                }

            }



            //Vehicle
            if ($("#vehicleEnable").prop("checked") === false) {
                totalVehicleCost = 0;
            } else {
                if ($('#car').prop("checked") === true) {
                    $('#errorCar').html("");
                    totalBikesCar = $("#totalBikesCar").val();
                    if (totalBikesCar !== null) {
                        if ($("#pdAvg").val() !== null && $("#pdAvg").val() !== '') {
                            pdAvg = $("#pdAvg").val();
                            $('#pdAvgError').html("");

                        } else {
                            pdAvg = 1;
                            $('#pdAvgError').html("This Petrol/Diesel Avg. is required.");
                        }
                        if ($("#km").val() !== null && $("#km").val() !== '') {
                            km = $("#km").val();
                            $('#kmError').html("");
                        } else {
                            km = 0;
                            $('#kmError').html("This Total Km is required.");
                        }
                        if ($("#rate").val() !== null && $("#rate").val() !== '') {
                            rate = $("#rate").val();
                            $('#rateError').html("");

                        } else {
                            rate = 0;
                            $('#rateError').html("This Petrol/Diesel Rate is required.");
                        }
                        totalVehicleCost = Math.round(((((km * 2) / pdAvg) * rate) / parseInt(totalAdults, 10)) * parseInt(totalBikesCar, 10));
                    } else if (totalBikesCar === null) {
                        $('#errorCar').html("This Total car is required.");
                    }
                } else if ($('#diffVehicle').prop("checked") === true) {

                    if ($("#ticketPrice").val() !== null && $("#ticketPrice").val() !== '') {
                        ticketPrice = $("#ticketPrice").val();
                        $('#ticketPriceError').html("");

                    } else {
                        $('#ticketPriceError').html("This Ticket Price is required.");
                    }

                    if ($("#returnTicketPrice").val() !== null && $("#returnTicketPrice").val() !== '') {
                        returnTicketPrice = $("#returnTicketPrice").val();
                        $('#returnTicketPriceError').html("");

                    } else {
                        $('#returnTicketPriceError').html("This Ticket Price is required.");
                    }
                    totalVehicleCost = Math.round(parseInt(ticketPrice, 10) + parseInt(returnTicketPrice, 10));
                }
            }


            //food
            if ($("#foodEnable").prop("checked") === false) {
                foodCostPerPerson = 0;
            } else {

                if ($("#rateBreakfast").val() !== null && $("#rateBreakfast").val() !== '') {
                    breakfast = $("#rateBreakfast").val();
                } else {
                    breakfast = $("#rateBreakfast").val(0);
                    breakfast = 0;
                }
                if ($("#rateLunch").val() !== null && $("#rateLunch").val() !== '') {
                    lunch = $("#rateLunch").val();
                } else {
                    lunch = $("#rateLunch").val(0);
                    lunch = 0;
                }
                if ($("#rateDinner").val() !== null && $("#rateDinner").val() !== '') {
                    dinner = $("#rateDinner").val();
                } else {
                    dinner = $("#rateDinner").val(0);
                    dinner = 0;
                }



                var foodStay;
                if (stay === 0 || stay === 1) {
                    foodStay = 1;
                } else {
                    foodStay = (stay + 1);
                }
                foodCostPerPerson = Math.round((parseInt(breakfast, 10) + parseInt(lunch, 10) + parseInt(dinner, 10)) * foodStay);
            }

            //extra Money 
            //            extraMoney = Math.round(500 * stay / totalAdults);
            extraMoney = parseInt(extraMoney, 10);
            //total

            perPersonCostPerDay = foodCostPerPerson + totalVehicleCost + hotelPricePerPerson + extraMoney;



            // console.log("foodCostPerPerson:" + foodCostPerPerson);
            // console.log("totalVehicleCost:" + totalVehicleCost);
            // console.log("hotelPricePerPerson:" + hotelPricePerPerson);
            // console.log("stay:" + stay);

            totalCost = perPersonCostPerDay * totalAdults;


            $('#totalBudget').html(totalCost);
            $('#extraMoney').html(extraMoney);
            $('#total').html(perPersonCostPerDay);
            $('#totalFood').html(foodCostPerPerson);
            $('#totalTrasportation').html(totalVehicleCost);
            $('#totalHotel').html(hotelPricePerPerson);


        } else if (totalAdults === null) {
            $('#error').html("This Total Adults is required.");
        } else if (startingDate === "") {
            $('#error').html("This 'Date From' is required.");
        } else if (endingDate === "") {
            $('#error').html("This 'Date To' is required.");
        } else if (extraMoney === "") {
            $('#error').html("This 'Extra Money' is required.");
        }
    });


    $(window).scroll(function () {
        if ($(this).scrollTop() > 350) {
            $('#submitBtn').addClass("fixed-action-btn");
            $('#submit').addClass("btn-floating btn-large");
            $('#submit').removeClass("btn");
            $("#submit").empty();
            $("#submit").append('<i class="material-icons right">send</i>');
        } else {
            $('#submitBtn').removeClass("fixed-action-btn");
            $('#submit').addClass("btn");
            $('#submit').removeClass("btn-floating btn-large");
            $("#submit").empty();
            $("#submit").append('Submit <i class="material-icons right">send</i>');
        }
    });


});
