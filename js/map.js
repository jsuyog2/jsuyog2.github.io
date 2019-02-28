 // Initialize the platform object:
 var platform = new H.service.Platform({
     'app_id': 'YLJimxqR6szOHWxWLhex',
     'app_code': '8pP47klOkZKCj1XUUmWj4A'
 });


 var APPLICATION_ID = 'YLJimxqR6szOHWxWLhex';
 var APPLICATION_CODE = '8pP47klOkZKCj1XUUmWj4A';
 var AUTOCOMPLETION_URL = '';

 function autoCompleteListener(textBox, event) {
     if (query != textBox.value) {
         if (textBox.value.length >= 1) {
             var params = '?' +
                 'query=' + encodeURIComponent(textBox.value) + // The search text which is the basis of the query
                 '&beginHighlight=' + encodeURIComponent('<mark>') + //  Mark the beginning of the match in a token. 
                 '&endHighlight=' + encodeURIComponent('</mark>') + //  Mark the end of the match in a token. 
                 '&maxresults=5' + // The upper limit the for number of suggestions to be included 
                 // in the response.  Default is set to 5.
                 '&app_id=' + APPLICATION_ID +
                 '&app_code=' + APPLICATION_CODE;
             ajaxRequest.open('GET', AUTOCOMPLETION_URL + params);
             ajaxRequest.send();
         }
     }
     query = textBox.value;
 }

 function onAutoCompleteSuccess() {

     clearOldSuggestions();
     addSuggestionsToPanel(this.response); // In this context, 'this' means the XMLHttpRequest itself.
     addSuggestionsToMap(this.response);
 }


 function onAutoCompleteFailed() {
     alert('Ooops!');
 }

 $(".autocomplete").keyup(function () {
     autoCompleteProduct(this, APPLICATION_ID, APPLICATION_CODE);
 });

 //get data for autocomplete
 function autoCompleteProduct(context, APPLICATION_ID, APPLICATION_CODE) {
     $.ajax({
         url: "https://autocomplete.geocoder.api.here.com/6.2/suggest.json",
         dataType: 'json',
         type: "GET",
         data: {
             "query": $(context).val(),
             "maxresults": 5,
             "app_id": APPLICATION_ID,
             "app_code": APPLICATION_CODE
         },
         success: function (result) {
             if ($(context).val() != '') {
                 autoCompleteSuccess(result, context);
             }
         }
     });
 }

 //set data into autocomplete
 function autoCompleteSuccess(response, elem) {
     var dataLength = Object.keys(response.suggestions).length;
     var dataArr = {};
     for (var i = 0; i < dataLength; i++) {
         //         dataArr.push(response.suggestions[i].label);
         dataArr[response.suggestions[i].label] = null;
     }
     const autocomplete = document.querySelector('#' + elem.id);
     var instance = M.Autocomplete.getInstance(autocomplete);
     instance.updateData(dataArr);

 }
 var startLat, startLong, endLat, endLong;

 function getletlong(context) {
     $.ajax({
         url: "https://geocoder.api.here.com/6.2/geocode.json",
         dataType: 'json',
         type: "GET",
         data: {
             "searchtext": $(context.el).val(),
             "app_id": APPLICATION_ID,
             "app_code": APPLICATION_CODE
         },
         success: function (result) {

             if (context.el.id == "autocomplete-input1") {
                 startLat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                 startLong = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                  $("#autocomplete-input2").prop('disabled', false);
             } else if (context.el.id == "autocomplete-input2") {
                 endLat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                 endLong = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                 getDistance(startLat, startLong, endLat, endLong);
             }
         }
     });
 }

 function getDistance(startLat, startLong, endLat, endLong) {
     var startLatLong = startLat + ',' + startLong;
     var endLatLong = endLat + ',' + endLong;
     $.ajax({
         url: "https://route.api.here.com/routing/7.2/calculateroute.json",
         dataType: 'json',
         type: "GET",
         data: {
             "waypoint0": startLatLong,
             "waypoint1": endLatLong,
             "mode": 'fastest;car;traffic:enabled',
             "app_id": APPLICATION_ID,
             "app_code": APPLICATION_CODE
         },
         success: function (result) {
             var temp = result.response.route[0].summary.distance
             var one = parseInt(String(temp).charAt(0));
             var numDec = (String(temp/1000).split(".")[0].length)*10;
             var extraKM = one*numDec;
             var distance = Math.round((result.response.route[0].summary.distance / 1000));
             $("#km").val(distance);
             M.updateTextFields();
         }
     });
 }
