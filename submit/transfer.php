<?
require_once("../includes/functions.php");

$data = geocodeLocation(trim($_GET['location']));

/*
$output = '<?xml version="1.0" encoding="utf-8">\n';

$output .= '<lat>'.$data['lat'].'</lat>\n';
$output .= '<lon>'.$data['lon'].'</lon>\n';
*/

$begin	= '{"point":[';
$end 		= ']}';


$coordinate = array('lat'=>$data['lat'], 'lon'=>$data['lon'], 'city'=>$data['city'][0]);

echo $begin.json_encode($coordinate).$end;



//print_r($data);
?>
