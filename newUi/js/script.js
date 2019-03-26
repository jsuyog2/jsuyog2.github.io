$(document).ready(function () {
    "use strict";
    $('.modal').modal();
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
    //display icon         
    $(".icon").each(function () {
        var icon = $(this).html();
        $(this).html('<img src="https://png.icons8.com/color/' + icon + '">');
    });
    
    $('#showMap').click(function(){
        $('#map').toggle();
        $('.card').toggle();
    });
    
    
});
