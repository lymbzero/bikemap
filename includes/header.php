<?php
	require_once('includes/functions.php');
?>
<html>
  <head>
    <title>Bike Map v2.0</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="Shortcut Icon" href="/bikemap/working/images/icons/favicon.ico">
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.8.2r1/build/reset-fonts-grids/reset-fonts-grids.css">
    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="styles.css">
		<script src="includes/map_functions.js"></script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-22935242-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</head>

	<script language="JavaScript">
		if (window.screen.width > 800)
			document.write('<div id="menubar">');
		else 
			document.write('<div id="menubar-sm">');
	</script>
	<!---
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
	-->
	</div>