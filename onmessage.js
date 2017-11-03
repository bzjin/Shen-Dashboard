var makeRow = function(module, timestamp, device, value) {
  s = "<tr><td>" + module + "</td><td>" + timestamp + "</td><td>" + device + "</td><td>" + value + "</td></tr>";
  return s;
}

var processUpdate = function (data) {
  // for every row
  var HTMLString = "";
  for (var i = 0; i < data.length; i++) {
    var dataRow = data[i];

    HTMLString = HTMLString + makeRow(dataRow["module"], dataRow["timestamp"], dataRow["device"], dataRow["value"]);
  }
  $("#viz-table tbody").html(HTMLString);
  //$("#viz").html(data);
};

var checkUpdates = function() {
  serverPoll = setInterval( function() {
    console.log("polling");
    $.get("sse.php",{}, processUpdate, 'json');
  }, 1000);
};

$( document ).ready(checkUpdates);
