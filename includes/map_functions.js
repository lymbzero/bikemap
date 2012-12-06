/* 	Bike Map                          		     			*/
/* 		Mihai Peteu <mihai.peteu@gmail.com>      			*/
/* 		Google Maps Geocoding 												*/

//=============================================
// updateMap(location)
//=============================================
function updateMap(location) {
	var locationURL = 'transfer.php?location=' + location;
		
	$.get(locationURL, 
		function(data) {
			//alert (location);
			var dataString = JSON.parse(data);
			var lat	= dataString.point[0].lat;
			var lon	= dataString.point[0].lon;
			var city= dataString.point[0].city[0];
			//alert (lat+', '+lon+' '+city);
			initialize(lat,lon);
		}
	);	
}

//=============================================
// styleMapBasedOnMaxRes()
//=============================================
function styleMapBasedOnMaxRes() {
	var activePixels = (window.screen.width * window.screen.height) / 1000;
	//alert (activePixels);
	var common =  " margin:0px; border: 1px solid black; ";

	if (window.screen.width > 800)
		return ' height: 96%; width: 100%; margin-left:0;';
	else 
		return (common+'width: '+(window.screen.width-8)+'px; height: '+(window.screen.height-20)+'px;');
}

function chooseWatermark() {
	if (window.screen.width > 800)
		return ('watermark');
	else 
		return ('watermark-sm');
}

//=============================================
// initialize(lat, lon)
//=============================================
function initialize(lat,lon) {
	//var midcity = new google.maps.LatLng(34.0193444,-118.4802778);		// SANTA MONICA
	//var midcity = new google.maps.LatLng(34.0193444,-118.3902778);		// LOS ANGELES
  
	var zoomValue = 15;
	var firstLoad = 0;
	
	if (lat==0 || lon==0) {
		firstLoad = 1;
		zoomValue = 10;
		lat = 34.0193444; lon = -118.3902778;
	}
	
  var mapCenter = new google.maps.LatLng(lat, lon);
  
  var myOptions = {
    zoom: zoomValue,
    center: mapCenter,
    disableDefaultUI: false,
    streetViewControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,            // ROADMAP, TERRAIN, SATELLITE, HYBRID
    panControl: false,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  }
  var map = new google.maps.Map(document.getElementById("map_geocode"), myOptions);

	if (firstLoad != 1) {
		var marker = new google.maps.Marker({
        position: mapCenter, 
        map: map,
        title:"Incident Location"
    });
  } 
  
  /***************** MAP STYLING *********************/
  var customStyles = [{
	    featureType: "all",
	    stylers: [
	      { saturation:	5	}, 
	      { lightness:	-4 }
	    ]
	  },
	  {
	    featureType: "poi.park",
	    stylers: [
	      { hue: "#339933" },
	      { saturation: -20 }
	    ]
	  }
	];
	
	map.setOptions({styles: customStyles});
	
	//var bikeLayer = new google.maps.BicyclingLayer();
	//bikeLayer.setMap(map);
}
