window.onload = function () {
    var submitButtonElement = document.getElementById("submitButton");
    submitButtonElement.onclick = function()
    {
        var outputElement = document.getElementById("output");
        var output = outputElement.value;

        var payloadElement = document.getElementById("payload");
        var payloadValue = payloadElement.value;
        $.ajax({
                beforeSend: function(request) {
                  request.setRequestHeader("Access-Control-Allow-Credentials", "http://localhost:7071");
                },
                type: 'POST',
                url: "http://localhost:7071/api/edge-message-publisher?name=test", 
                success: function(result){
          console.log(result);
          displayInLogger(result);
        }});  
    }
};

function displayInLogger(result) {
  var logElement = document.getElementById("logs");
  logElement.innerHTML = result;
}

