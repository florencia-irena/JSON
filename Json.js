jQuery(document).ready(function(){
  $("#button").click(function(){
    getFeatures();
  });
  $("#clear").click(function(){
    $("#JsonData").empty();
  });
  getFeatures();
}); 

function getFeatures() {
  var $data = $("#JsonData");
  var tableId;
  tableId = prompt ("Enter the table Id that you wish to access below:");
  while(tableId === ""){
    alert ("You didn't enter the tableId!");
    tableId = prompt ("Enter the table Id that you wish to access below:");
  }  
  jQuery.ajax({
    url: 'https://www.googleapis.com/mapsengine/v1/tables/'+ tableId +'/features?version=published&key=AIzaSyAllwffSbT4nwGqtUOvt7oshqSHowuTwN0',
    dataType: 'json',
    success: function(resource) {
      var resourceString = JSON.stringify(resource, null, 2);
      $data.append("\n");
      $data.append(resourceString);
      $data.append("\n");
    },
    error: function(response) {
      
      response = JSON.parse(response.responseText);
      var errorMess = response.error.errors[0];
      if (errorMess.reason === "authError") {
        $data.append("\nYour authorization token is invalid. \nPlease check that the table can be viewed by general public\n\n");
      } else if (errorMess.reason === "invalid") {
        var field = errorMess.location;
        $data.append("\nInvalid value in the \""+field+"\" field.\nCheck whether you've given the right tableId\n\n");
      } else {
        $data.append("\nThe data cannot be processed. See the details below for the information regarding the error:\n\n");
      }
      var responseString = JSON.stringify(errorMess, null, 2);
      $data.append(responseString);
      $data.append("\n");
    }
  });
}
