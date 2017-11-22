var makeRow = function(module, timestamp, device, value) {
  s = "<tr><td>" + module + "</td><td>" + timestamp + "</td><td>" + device + "</td><td>" + value + "</td></tr>";
  console.log(s);
  console.log("makeRow");
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
  console.log("processUpdate")
  //$("#viz").html(data);
};

var checkUpdates = function() {
  serverPoll = setInterval( function() {
    $.get("sse.php",{}, processUpdate, 'json');
    $.ajax({
       url:'http://krusty.mse.cornell.edu/',
       type:'GET',
       success: function(data) {

         $('<tr>').each(function(i, el) {
           console.log(i, el)
           //console.log($('<tr>').append(data).find('td:eq(2)').text())
             var query = $(el).children('td').text();
              console.log(query)
              //$.ajax (do your AJAX call here using values of query and text
          });
           //var content = $('<tr>').append(data).find('td:eq(2)').text();
           //var c1 = $('<tr>').append(data).find('td:eq(2)').text();
           //var c2 = $('<tr>').append(data).find('td:eq(2)').text();
           //var c3 = $('<tr>').append(data).find('td:eq(2)').text();

           //console.log(content, c1, c2, c3);
       }
    });
  }, 1000);
};

$( document ).ready(checkUpdates);
