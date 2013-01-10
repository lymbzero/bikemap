<? ini_set('display_errors',1);  ?>
<? include_once('includes/header.php'); ?>

  <body onload="styleMapBasedOnMaxRes(); chooseWatermark(); ">
    <script language="JavaScript">
			document.write('<div id="'+chooseWatermark()+'"></div>');
		</script>
		<div id="topper"><h2>Santa Monica Traffic Collisions</h2><span id="topperDateRange"></div>
		<script language="JavaScript">
			document.write('<div id="map_canvas" style="'+styleMapBasedOnMaxRes()+'"></div>');
		</script>
    <div id="options" class="box expanded">
      <div id="optionsTitle"></div> 
      <div id="optionsInner"> 

       	<div id="bikeOpts">
				  <h3>Bicycle</h3>
				  <input id="bikeLayer" class="check" type="checkbox" checked="checked" />
				  <hr/>
				  <ul>
					  <li class="bikeLegend fa"><label>Fatal</label><input id="bfa" class="check" type="checkbox" checked="checked" /></li>
					  <li class="bikeLegend hrf"><label>Felony</label><input id="bhrf" class="check" type="checkbox" checked="checked"/></li>
					  <li class="bikeLegend hrm"><label>Misdemeanor</label><input id="bhrm" class="check" type="checkbox" checked="checked"/></li>
					  <li class="bikeLegend in"><label>Injury</label><input id="bin" class="check" type="checkbox" checked="checked"/></li>								
					  <li class="bikeLegend ni"><label>Non-Injury</label><input id="bni" class="check" type="checkbox" checked="checked"/></li>
				  </ul>    
			  </div>
      	<div id="pedOpts">
				  <h3>Pedestrian</h3>
				  <input id="pedLayer" class="check" type="checkbox"/ checked="checked">
				  <hr/>				
				  <ul>
					  <li class="pedLegend fa"><label>Fatal</label><input id="pfa" class="check" type="checkbox" checked="checked" /></li>
					  <li class="pedLegend hrf"><label>Felony</label><input id="phrf" class="check" type="checkbox" checked="checked" /></li>
					  <li class="pedLegend hrm"><label>Misdemeanor</label><input id="phrm" class="check" type="checkbox" checked="checked" /></li>
					  <li class="pedLegend in"><label>Injury</label><input id="pin" class="check" type="checkbox" checked="checked" /></li>								
					  <li class="pedLegend ni"><label>Non-Injury</label><input id="pni" class="check" type="checkbox" checked="checked" /></li>										  </ul>    
			  </div>
      	<div id="groupOpts">
				  <h3>Grouping</h3>
				  <hr/>				
				  <ul>
					  <!-- <li id="hotspotItem"><label>Hot Spots</label><input id="hotspot" class="check" type="checkbox"/></li> -->
					  <li id="clusterItem"><label>Clustering</label><input id="cluster" class="check" type="checkbox"/></li>
				  </ul>    
			  </div>
        <div id="totalMarkers"></div>
			  <div id="slider">
				  <p>
					  <label for="amount">Range &nbsp;&nbsp;</label><span id="amount"></span>
				  </p>
				  <div id="slider-range"></div>
			  </div>
      </div>
      <div id="closeOpts"></div>

    </div>
  	<div id="toolTip" class="hidden box"></div>
    
    
  </body>

  <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
  <script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js"></script>
<!--   <script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer_compiled.js"</script> -->
  <script src="http://code.jquery.com/jquery-1.5.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
  <script src="redfin.js"></script>
  <script src="js.js"></script>

<? require_once('includes/footer.php'); ?>
