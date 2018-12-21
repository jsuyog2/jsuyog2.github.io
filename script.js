$(document).ready(function () {
    $('select').formSelect();
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        autoClose: true
    });
    $('.timepicker').timepicker({
        autoClose: true
    });
    //People
    var totalAdults = 0;
    //dates
    var startingDate = 0;
    var endingDate = 0;
    var days = 0;
    //hotel
    var hotelPrice = 0;
    var stay = 0;
    var hotelPricePerDay = 0;
    var hotelPricePerPerson = 0;
    //vehicle
    var pdAvg = 0;
    var km = 0;
    var rate = 0;
    var returnTicketPrice = 0;
    var ticketPrice = 0;
    var totalVehicleCost = 0;
    //food
    var breakfast = 0;
    var lunch = 0;
    var dinner = 0;
    var foodCostPerPerson = 0;


    //hotelEnable Checkbox
    $("#hotelEnable").change(function () {
        if ($(this).prop("checked") == true) {
            $("#forHotel").prop('hidden', false);
        } else if ($(this).prop("checked") == false) {
            $("#forHotel").prop('hidden', true);
        }
    });
    //vehicleEnable Checkbox
    $("#vehicleEnable").change(function () {
        if ($(this).prop("checked") == true) {
            $("#forVehicle").prop('hidden', false);
        } else if ($(this).prop("checked") == false) {
            $("#forVehicle").prop('hidden', true);
        }
    });
    //foodEnable Checkbox
    $("#foodEnable").change(function () {
        if ($(this).prop("checked") == true) {
            $("#forFood").prop('hidden', false);
        } else if ($(this).prop("checked") == false) {
            $("#forFood").prop('hidden', true);
        }
    });

    //trip radio button
    $('input[name="tripVehicle"]').change(function () {
        if ($('#car').prop("checked") == true) {
            $("#carDiv").prop('hidden', false);
            $("#diffVehicleDiv").prop('hidden', true);
        } else if ($('#diffVehicle').prop("checked") == true) {
            $("#carDiv").prop('hidden', true);
            $("#diffVehicleDiv").prop('hidden', false);
        }
    });
    $('input[name="foodRadio"]').change(function () {
        if ($('#defaultFood').prop("checked") == true) {
            $("#foodDiv input").prop('disabled', true);
            $("#rateBreakfast").val(100);
            $("#rateLunch").val(200);
            $("#rateDinner").val(200);
        } else if ($('#changeFood').prop("checked") == true) {
            $("#foodDiv input").prop('disabled', false);
        }
    });


    //submit click
    $("#submit").click(function () {
        //People
        totalAdults = $("#totalAdults").val();
        startingDate = $('#startingDate').val();
        endingDate = $('#endingDate').val();
        if (totalAdults != null && startingDate!= "" && endingDate!="") {
            $('#error').html("");


            console.log("totalAdults" + totalAdults);


            //days

            days = datediff(startingDate, endingDate);
            if (days == 0) {
                stay = 1;
            } else {
                stay = days;
            }
            var hr = (parseDate(startingDate)).getHours();
            console.log(hr);

            //hotel
            if ($("#hotelEnable").prop("checked") == false) {
                hotelPricePerPerson = 0;
            } else if ($("#hotelEnable").prop("checked") == true) {
                hotelPrice = $("#hotelPrice").val();
                hotelPricePerDay = hotelPrice * stay;
                hotelPricePerPerson = hotelPricePerDay / totalAdults;
            }



            //Vehicle
            if ($("#vehicleEnable").prop("checked") == false) {
                totalVehicleCost = 0;
            } else {
                if ($('#car').prop("checked") == true) {
                    pdAvg = $("#pdAvg").val();
                    km = $("#km").val();
                    rate = $("#rate").val();
                    totalVehicleCost = (((km * 2) / pdAvg) * rate) / totalAdults;
                } else if ($('#diffVehicle').prop("checked") == true) {
                    ticketPrice = $("#ticketPrice").val();
                    returnTicketPrice = $("#returnTicketPrice").val();
                    totalVehicleCost = parseInt(ticketPrice) + parseInt(returnTicketPrice);
                }
            }


            //food
            if ($("#foodEnable").prop("checked") == false) {
                foodCostPerPerson = 0
            } else {
                breakfast = $("#rateBreakfast").val();
                lunch = $("#rateLunch").val();
                dinner = $("#rateDinner").val();
                var foodStay;
                if(stay==0||stay==1){
                    foodStay=1;
                }else{
                    foodStay=(stay+1);
                }
                foodCostPerPerson = (parseInt(breakfast) + parseInt(lunch) + parseInt(dinner)) * foodStay;
            }


            //total

            var perPersonCostPerDay = foodCostPerPerson + totalVehicleCost + hotelPricePerPerson;
            console.log("foodCostPerPerson:" + foodCostPerPerson);
            console.log("totalVehicleCost:" + totalVehicleCost);
            console.log("hotelPricePerPerson:" + hotelPricePerPerson);
            console.log("stay:" + stay);

            var perPersonCost = perPersonCostPerDay*totalAdults;


            $('#totalBudget').html(perPersonCost);
            $('#total').html(perPersonCostPerDay);
            $('#totalFood').html(foodCostPerPerson);
            $('#totalTrasportation').html(totalVehicleCost);
            $('#totalHotel').html(hotelPricePerPerson);


        } else if(totalAdults == null){
            $('#error').html("This Total Adults is required.");
        }else if (startingDate== "") {
            $('#error').html("This 'Date From' is required.");
        }else if (endingDate=="") {
            $('#error').html("This 'Date To' is required.");
        }
    });



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