<?php
require_once('../includes/functions.php');
header ("Content-Type:text/xml");  

//===============================================
//$query = "SELECT * FROM bikemap.collision_data";
$query = "SELECT * FROM bikemap.COLLISIONS WHERE lat!=0";
$result = mysql_query($query);

$output = '<?xml version="1.0" encoding="UTF-8" ?>';
$output .= '<IncidentList>';

while ($row = mysql_fetch_assoc($result)) {
	$output.="<Incident>";
	$output.= '<ID>'.$row['incident_ID'].'</ID>';
	$output.= '<date>'.$row['collision_date'].'</date>';
	$output.= '<lat>'.$row['lat'].'</lat>';
	$output.= '<lon>'.$row['lon'].'</lon>';
	$output.="</Incident>";
}
$output .= "</IncidentList>";
echo $output;
?>
