<?php
	require_once("../includes/functions.php");
?>
<HTML><head>
<link rel="stylesheet" type="text/css" href="../styles.css">
<link rel="stylesheet" href="http://jqueryui.com/themes/base/jquery.ui.all.css">
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
<script src="../includes/map_functions.js"></script>

</head>
<?	
$lat = $lon = 0;
$city = "";
if ( trim($_POST['location'])!="" ) {
	$coords = geocodeLocation($_POST['location']);
	//echo '<body onload="initialize('.$coords['lat'].','.$coords['lon'].')">';
	$lat = $coords['lat'];  $lon = $coords['lon'];  $city=$coords['city']; 
}

echo '<body onload="initialize(\''.$lat.'\',\''.$lon.'\')">';

echo '<div id="submission_form">';

echo '<form id="reportForm" class="" enctype="multipart/form-data" method="post" action="">';
echo '* = required<br>';

echo '<h4>Where did this happen *</h4>';
echo '<div class="note">(intersection or street address & city name)</div>';
echo '<input id="location" type="text" size="30" value="" name="location" onBlur="updateMap(this.value)"><br>';

echo '<h4>Date and Time *</h4>';
//echo '<div class="note">(automatically set to current time)</div>';
echo '<input id="incident_date" type="text" size="30" value="'.date('Y-m-d H:i:s').'" name="incident_date"><br>';

echo '<h4>Incident Type *</h4>';
$categoriesArray = getIncidentTypes();
echo '<select id="incident_type" name="incident_type">';
foreach ($categoriesArray as $key=>$val) {
	echo '<option value="'.$key.'">'.$val.'</option>';
}
echo '</select><br>';

echo '<h4>What happened *</h4>';
echo '<textarea type="textarea" rows="12" cols="32" value="" name="description" ></textarea><br>';

echo '<h4>Vehicle License Plate</h4><div class="note">(use * for unknown characters in partial plates)</div>';
echo '<input id="license_plate" class="textlong" type="text" value="" name="license_plate">';

echo '<h4>Name</h4>';
echo '<input id="user_name" class="textlong" type="text" value="" name="user_name">';

echo '<h4>Email *</h4>';
echo '<input id="user_email" class="textlong" type="text" value="" name="user_email">';

echo '<h4>Phone</h4>';
echo '<input id="user_phone" class="textlong" type="text" value="" name="user_phone">';

//echo '<hr size=1>';
echo '<input type="submit" value="Submit" name="submit" class="btn_submit">';

echo '</form>';
echo '</div>';

echo '<div id="debug_box">';

pre($_POST);

$location 			= sanitize($_POST['location']);
$description		= sanitize($_POST['description']);
$incident_type	= sanitize($_POST['incident_type']);
$plate 	= sanitize($_POST['license_plate']);
$name		= sanitize($_POST['user_name']);
$email	= sanitize($_POST['user_email']);
$phone	= sanitize($_POST['user_phone']);
$date 	= sanitize($_POST['incident_date']);

if ($location!="" && $email!="" && $description!="") {
	$query = 	"INSERT INTO user_reports SET location='$location', city='$city', incident_type='$incident_type', ".
						"lat='$lat', lon='$lon', description='$description', license_plate='$plate', ".
						"incident_date='$date', user_name='$name', user_email='$email', user_phone='$phone'";
	//echo $query;

	mysql_query($query);
}
echo '</div>';

?>
<div id="map_geocode"></div>
</body>
</HTML>
