<?php
  $city = $_GET['city'];
  $key = $city;
//  error_log("Key: $key");
  $output = '';
  $output = apc_fetch($key);

  if($output == '') {

    switch($key) {
      case "santaMonica":
        $apiURL = "http://users.design.ucla.edu/~mpeteu/testbed/incidents/xmldata-sm.php";
        break;
      case "santaMonicaHotspots":
        $apiURL = "http://users.design.ucla.edu/~mpeteu/testbed/incidents/xml-sm-hotspots.php";
        break;
      case "losAngeles":
        $apiURL = "http://users.design.ucla.edu/~mpeteu/testbed/incidents/xmldata-la.php";
        break;
      case 'la';
        $apiURL = "http://solid.it.cx/bikemap/work/data/xmldata.php";
      default:
        $apiURL = "http://users.design.ucla.edu/~mpeteu/testbed/incidents/xmldata-sm.php";
    }

    ob_start();

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiURL);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Linux - cURL');
    curl_setopt($ch, CURLOPT_HEADER, 0);

    curl_exec($ch);
    curl_close($ch);
    error_log('cURLing external API');
    $output = ob_get_contents();
    ob_end_clean();
  }

  if( simplexml_load_string($output) === FALSE ) {
    error_log('cURL is not valid XML'); 	
    error_log('Reading from local-static XML'); 
    $filename = "data/bikemap-sm.xml";
    $handle = fopen($filename, "r");
    $output = fread($handle, filesize($filename));
    fclose($handle);
  }

  apc_store($key, $output, 1000);

  header ("Content-Type:text/xml");
  echo $output;
?>