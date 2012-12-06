<?php
	require_once('functions.php');
?>
<html>
  <head>
    <title>Bike Map v2.0</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="Shortcut Icon" href="/bikemap/working/images/icons/favicon.ico">
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.8.2r1/build/reset-fonts-grids/reset-fonts-grids.css">
    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="styles.css">
    
       <link rel="stylesheet" href="http://jqueryui.com/themes/base/jquery.ui.all.css">

		
			<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
			<script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
			<script src="includes/map_functions.js"></script>
			<script src="includes/jquery.datepicker.js"></script>
			<script src="includes/jquery.ui.core.js"></script>
			<script src="includes/jquery.ui.widget.js"></script>
			<script>
				$(function() { 	$( "#datepicker" ).datepicker(); 	});
			</script>
	</head>
	
	<script language="JavaScript">
		if (window.screen.width > 800)
			document.write('<div id="menubar">');
		else 
			document.write('<div id="menubar-sm">');
	</script>
		<div id="menu-opts">
			<a href="submit.php">Report</a>
			<script language="JavaScript">
				if(window.screen.width > 800)
					document.write('<img src="images/spacer.png" id="spacer">');
				else
					document.write('<img src="images/spacer-sm.png" id="spacer">');
			</script>
			<a href="reports.php">Browse</a>
			<script language="JavaScript">
				if(window.screen.width > 800)
					document.write('<img src="images/spacer.png" id="spacer">');
				else
					document.write('<img src="images/spacer-sm.png" id="spacer">');
			</script>
			<a href="#">Contact</a>
		</div>
	</div>