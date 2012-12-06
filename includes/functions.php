<?
define("MAPS_HOST", "maps.google.com");
define("KEY","ABQIAAAAer3a6MMz6UPRfa1V5I29IxQwJmIXsV-Zfzgp61rgL6GKllzBnxSmSMFkzj2kgfbHy66mLC4cc9rN7A");


$link = mysql_pconnect('localhost', 'mpeteu', 'locdog');
if (!$link)   die('Could not connect: ' . mysql_error());
mysql_select_db("bikemap");


//----------------------------------------------------------------------------
//  Name:     gv
//  Purpose:  silently fails when trying to echo an empty string  
//----------------------------------------------------------------------------
function gv(& $var) {
  if (isset($var))    return $var;
  else                return "";
}

//----------------------------------------------------------------------------
//  Name:     pre
//  Purpose:  grabs total occurence of a specific type  
//----------------------------------------------------------------------------
function pre($data) {
	echo "<PRE>";  print_r($data); echo "</PRE>";
}

//----------------------------------------------------------------------------
//  Name:     sanitize
//  Purpose:  sanitize incoming GET vars
//----------------------------------------------------------------------------
function sanitize(& $var) {
  if (isset($var))	{
		$var = str_replace("'","",$var);
		$var = str_replace('"','',$var);
		$var = str_replace('/','',$var);
		return trim(addslashes($var));
  }
	else                return "";
}


//------------------------------------------------------------------------------
//  Name:     geocodeLocation
//  Purpose:  find lat/lon coordinates for a given location stored in db (string) 
//-------------------------------------------------------------------------------
function geocodeLocation($location) {
	// Initialize delay in geocode speed
	$delay = 0;
	$base_url = "http://" . MAPS_HOST . "/maps/geo?output=xml" . "&key=" . KEY;

	// TODO:  get general area for Ventura, Oxnard and LA County (Southwest | Northeast)
	$viewport_bias = '&bounds=34.172684,-118.604794|34.236144,-118.500938';
	
	$geocode_pending = true;

	while ($geocode_pending) {
  	$request_url = $base_url . "&q=" .urlencode($location);
		//echo '<a href="$request_url">'.$request_url.'</a>';
		$xml = simplexml_load_file($request_url) or die("url not loading");

  	$status = $xml->Response->Status->code;

		if (strcmp($status, "200") == 0) {
			$geocode_pending = false;
			$coordinates = $xml->Response->Placemark->Point->coordinates;
			$city = $xml->Response->Placemark->AddressDetails->Country->AdministrativeArea->Locality->LocalityName;
			if($city=="") {
				$city = $xml->Response->Placemark->AddressDetails->Country->AdministrativeArea->DependentLocality->DependentLocalityName;
				
				if ($city=="") {
					$city = $xml->Response->Placemark->AddressDetails->Country->AdministrativeArea->SubAdministrativeArea->Locality->LocalityName;
				}
  	  }
			$coordinatesSplit = split(",", $coordinates);
	    // Format: Longitude, Latitude, Altitude
  	  $lat = $coordinatesSplit[1];
    	$lon = $coordinatesSplit[0];
		}
 		else if (strcmp($status, "620") == 0) {
  		$delay += 100000;		      // sent geocodes too fast
  	} 
		else {
   	 	// failure to geocode
   	 	$geocode_pending = false;
   	 	echo "Address " . $location . ' failed to geocoded. Try <a href="'.$request_url.'">manually</a>. ';
   		echo "(Received status " . $status . ")<BR>";
  	}
	usleep($delay);
	} 
	return array('lat'=>$lat, 'lon'=>$lon, 'city'=>$city);
}

function getIncidentTypes() {
	$result = mysql_query("SELECT * FROM bikemap.incident_type ORDER BY ID ASC");
	
	$data = array();
  while ($row = mysql_fetch_assoc($result)) {
    $data[$row['ID']] = $row['name'];
  }
  return $data;
}
?>
