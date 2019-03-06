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

$(document).ready(function () {
    var totalAdults = parseInt($('#totalGuest').val());
    var startingDate = $('#startingDate').val();
    var endingDate = $('#endingDate').val();
    var hotel = $('#hotelEnable').prop("checked");
    var vehicle = $('#vehicleEnable').prop("checked");
    var food = $('#foodEnable').prop("checked");
});

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

    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }

    function datediff(first, second) {
        first = parseDate(first);
        second = parseDate(second);
        return Math.round(Math.abs((second.getTime() - first.getTime()) / (86400000)));
    }

    //People
    var totalAdults = 0,
        //dates
        startingDate = 0,
        endingDate = 0,
        days = 0,
        //hotel
        hotelPrice = 0,
        stay = 0,
        hotelPricePerDay = 0,
        hotelPricePerPerson = 0,
        //vehicle
        totalBikesCar = 0,
        pdAvg = 0,
        km = 0,
        rate = 0,
        returnTicketPrice = 0,
        ticketPrice = 0,
        totalVehicleCost = 0,
        //food
        breakfast = 0,
        lunch = 0,
        dinner = 0,
        foodCostPerPerson = 0,
        //extra money
        extraMoney = 0,
        //perPersonCosts
        perPersonCostPerDay = 0,
        totalCost = 0;

    //hotelEnable Checkbox
    $("#hotelEnable").change(function () {
        if ($(this).prop("checked") === true) {
            $("#forHotel").prop('hidden', false);
        } else if ($(this).prop("checked") === false) {
            $("#forHotel").prop('hidden', true);
        }
    });
    //vehicleEnable Checkbox
    $("#vehicleEnable").change(function () {
        if ($(this).prop("checked") === true) {

            $("#forVehicle").prop('hidden', false);
        } else if ($(this).prop("checked") === false) {

            $("#forVehicle").prop('hidden', true);
        }
    });
    //foodEnable Checkbox
    $("#foodEnable").change(function () {
        if ($(this).prop("checked") === true) {
            $("#forFood").prop('hidden', false);
        } else if ($(this).prop("checked") === false) {
            $("#forFood").prop('hidden', true);
        }
    });

    //trip radio button
    $('input[name="tripVehicle"]').change(function () {
        if ($('#car').prop("checked") === true) {
            $("#carDiv").prop('hidden', false);
            $("#diffVehicleDiv").prop('hidden', true);
        } else if ($('#diffVehicle').prop("checked") === true) {
            $("#carDiv").prop('hidden', true);
            $("#diffVehicleDiv").prop('hidden', false);
        }
    });
    $('input[name="foodRadio"]').change(function () {
        if ($('#defaultFood').prop("checked") === true) {
            $("#foodDiv input").prop('disabled', true);
            $("#rateBreakfast").val(100);
            $("#rateLunch").val(200);
            $("#rateDinner").val(200);
        } else if ($('#changeFood').prop("checked") === true) {
            $("#foodDiv input").prop('disabled', false);
        }
    });


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
