<?php include "../inc/dbinfo.inc"; ?>
<?php
  //header('Content-Type: text/event-stream'); // specific sse mimetype
  header('Cache-Control: no-cache'); // no cache

  $con = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD);
  if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $database = mysqli_select_db($con, DB_DATABASE);
  $query = mysqli_query($con,"SELECT * FROM datatable");

  //while(true){
     if (mysqli_num_rows($query) > 0) {
      // output data of each row
      $d = array();

      $row_idx = 0;
      while ($row = mysqli_fetch_assoc($query)) {
        $row = array("module" => $row["module"], "timestamp" => $row["timestamp"], "device" => $row["device"], "value" => $row["value"]);
        $d[(string)$row_idx] = $row;
        $row_idx++;
      }
      echo json_encode($d);
    }
    ob_flush(); // clear memory
    flush(); // clear memory

    mysqli_free_result($query);
    mysqli_close($con);

  //$query_data = mysqli_fetch_row($query));

?>
