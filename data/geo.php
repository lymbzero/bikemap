<?php
define("MAPS_HOST", "maps.google.com");
define("KEY", "ABQIAAAAer3a6MMz6UPRfa1V5I29IxRsYDVqMi_sAkBK6d4aWl63i3EXCRRWpfnFMg2kscbsdkdFl4ApUxdgUQ");
?>
<HTML>
<HEAD>
<TITLE>Incident Data Geocoding</TITLE>
<link href="includes/style.css" rel="stylesheet" type="text/css">
<meta http-equiv=Content-Type content="text/html;  charset=ISO-8859-1">
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=<?php echo KEY;?>" 
type="text/javascript"></script>
</HEAD>
<?php
include('../includes/functions.php');

$query = "SELECT * FROM bikemap.collision_data WHERE lat=0 OR lon=0";

$result = mysql_query($query);
$count = 1;

// Initialize delay in geocode speed
$delay = 0;
$base_url = "http://" . MAPS_HOST . "/maps/geo?output=xml" . "&key=" . KEY;

while ($row = mysql_fetch_assoc($result)) {
	//pre($row);
	
//=============== LOS ANGELES ===============================================
	$geocode_pending = true;

	$ID 			= $row['ID'];
	$location = $row['primary_rd']." and ".$row['secondary_rd'].','.$row['city'].",CA";

  while ($geocode_pending) {
    $request_url = $base_url . "&q=" . urlencode($location);
	//	echo "|".$request_url."|<br>";
    $xml = simplexml_load_file($request_url) or die("url not loading");
		
    $status = $xml->Response->Status->code;
    if (strcmp($status, "200") == 0) {
			$geocode_pending = false;
			$coordinates = $xml->Response->Placemark->Point->coordinates;
      $coordinatesSplit = split(",", $coordinates);
      // Format: Longitude, Latitude, Altitude
      $lat = $coordinatesSplit[1];
      $lon = $coordinatesSplit[0];
//			echo $lat.", ".$lon."<br>";

			// LA
			$query = "UPDATE bikemap.collision_data SET lat='$lat', lon='$lon' WHERE ID=$ID ";
			echo $query."<br>";
			mysql_query($query);
		}	
   	else if (strcmp($status, "620") == 0) {
      // sent geocodes too fast
      $delay += 100000;
    } 
		else {
      // failure to geocode
      $geocode_pending = false;
      echo $location . ' failed to geocode. ';
      echo "(Received status " . $status . ")<BR>";
			echo '<a href="http://maps.google.com/?q='.$location.'" target="blank">View on map</a> | 
					  <a href="'.$request_url.'" target="blank">Try manually</a><br><br>';
    }
    usleep($delay);
	}

  $count ++;  

  if ($count == 80) break;	
}
?>
</body>
</html>
