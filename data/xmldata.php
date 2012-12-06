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
	foreach($row as $key => $value) {
		if(trim($value)=="") $value="N/A";

		$output.= '<'.$key.'>'.$value.'</'.$key.'>';
	}
	$output.="</Incident>";
}
$output .= "</IncidentList>";
echo $output;
?>
