//
function saveTrip() {
    var name = $('#trip_name').val();
    firebase.auth().onAuthStateChanged(function (user) {
            var userId = user.uid;
            var email = user.email;
            firebase.database().ref('users/' + userId + '/saveTrip/'+name).set({
                Name: 'as'
            });
    });
}

$('#trip_name').keyup(function () {
    var name = $('#trip_name').val();
    firebase.auth().onAuthStateChanged(function (user) {
        firebase.database().ref('users/' + user.uid + '/saveTrip/' + name).on("value", function (snapshot) {
            if (snapshot.numChildren() > 0) {
                $("#saveTripBtn").attr("onclick", "");
                $("#saveTripBtn").addClass("disabled");
                $("#errorSave").html("already exist");
            } else {
                $("#saveTripBtn").attr("onclick", "saveTrip()");
                $("#saveTripBtn").removeClass("disabled");
                $("#errorSave").html("");
            }
        });
    });
});
