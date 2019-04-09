$(document).ready(function () {
    $('#checkIn').datepicker({
        format: "dd/mm/yyyy",
        autoClose: true,
        minDate: new Date(),
        onSelect: function (date) {
            $("#checkOut").prop('disabled', false);
            $('#checkOut').datepicker({
                format: "dd/mm/yyyy",
                autoClose: true,
                minDate: date
            });
        }
    });
});
