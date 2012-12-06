/* 	Bike Map                          		     					*/
/* 		Jason Leung closednode@gmail,com        					*/
/* 		Google Maps + MapCluster + FastMarker + jQuery		*/

var bikemap = new function() {
	//Global Variables
  var map; //The Google Map Object
  var mc; //MarkerCluster
	var t; //setTimeout 
	var bikeArr = []; //bicycle incident Array
	var pedArr = []; //pedestrian incident Array
  var showOverlay; // FastMarkersOverlay Object 
	var showArr = []; // FastMarkers Array


	//Start the script when document is ready!
  $(document).ready(function() {
    initialize();
   populate("santaMonica");
//   populate("la");
    addListeners();
    slider.init();
    options.toggle();
    setTimeout(function() {
      options.update();
    },1200); 
    
 });


	//Google Maps Initialize
  var initialize = function() {
    var midcity = new google.maps.LatLng(34.0193444,-118.4802778);		// SANTA MONICA
//    var midcity = new google.maps.LatLng(34.0193444,-118.3902778);		// LOS ANGELES
    var myOptions = {
      zoom: 14,
      center: midcity,
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

 //=== STYLING !!!  --------------------------------
    var lowKeyMapStyle = [
      {
        featureType: "all",
        stylers: [
          {  hue: "" },
          { saturation: -55 },
          { lightness: -20 },
          { gamma: 1.6 }
        ]
      },{
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { saturation: -20 },
          { lightness: -2 }
        ]
      }
    ];
    //=== END STYLING  --------------------------------   

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		map.setOptions({styles: lowKeyMapStyle});
    
  };




	//The Indicent Object
	var Incident = function(iObj) {

/*
<incident_ID>4027461</incident_ID>
<collision_date>2008-12-31</collision_date>
<primary_rd>120th St</primary_rd>
<secondary_rd>Main St</secondary_rd>
<lat>33.923722</lat>
<lon>-118.2739752</lon>
<pcf>22107 </pcf>
<violation_category>Improper Turning</violation_category>
<collision_type>Broadside</collision_type>
<severity>Injury - Complaint of Pain</severity>


 	this.id = iObj.find('incident_ID').text(); 
	this.date = iObj.find('collision_date').text();
 	this.primary = iObj.find('primary_rd').text();
 	this.secondary = iObj.find('secondary_rd').text();  
	this.lat = iObj.find('lat').text();
	this.lon = iObj.find('lon').text();
	this.location = new google.maps.LatLng(this.lat,this.lon);
	this.pcf = iObj.find('pcf').text();
	this.violation = iObj.find('violation_category').text();
	this.colType = iObj.find('collision_type').text();
    	this.involved = "Bicycle";
    	this.incident = "Injury";

		var getMarkerHTML = function() {
			var inner;		
			inner = "<div style='display:none;'>";
			inner += "<h4 class='red'><involved>involved placeholder</involved>incident placeholder</h4>";
			inner += "<date>" + this.date + "</date><br />  ";
			inner += "<intersection>" + this.primary + " / " + this.secondary + "</intersection>" + "<br />";
			inner += "<colType>" + this.colType + "</colType>" + "<br />";
			inner += "<pcf>" + this.pcf + "</pcf><br />"
			inner += "<violation>" + this.violation + "</violation>" + "<br />";
			inner += '<div class="pow"></div>' ;
			inner += "</div>";
			inner += "<img class='oIcon' src='/bikemap/work/images/icons/b-inj.png' />";
			return inner;
		};

*/
/* Santa Monica Data
<Incident>
<incident_ID>110011238</incident_ID>
<date_r>2011-02-01</date_r>
<location>Main St and Colorado Ave</location>
<lat>34.0125967</lat>
<lon>-118.4934156</lon>
<violation>21801(A)VC</violation>
<incident_idx>B</incident_idx>
<incident>Injury</incident>
<collision>Broadside</collision>
<involved>Bicycle</involved>
<pcf>Unsafe/Illegal Turn</pcf>
<n_vehicles>-</n_vehicles>
<nr_injured>1</nr_injured>
<petit>Injury</petit>
<img>b-inj.png</img>
</Incident>
*/

		//Public Variables
	 	this.id = iObj.find('incident_ID').text(); 
	 	this.date = iObj.find('date_r').text();
	 	this.intersection = iObj.find('location').text();
	 	this.lat = iObj.find('lat').text();
	  this.lon = iObj.find('lon').text();
	  this.location = new google.maps.LatLng(this.lat,this.lon);
	  this.involved = iObj.find('involved').text();
		this.violation = iObj.find('violation').text();
	  this.incident = iObj.find('petit').text();	 		 	
		this.aIdx = iObj.find('incident_idx').text();
		this.colType = iObj.find('collision').text();
	  this.pcf = iObj.find('pcf').text();
	  this.desc = iObj.find('desc').text();
  	this.icon = "images/icons/" + iObj.find('img').text(); 


		var getMarkerHTML = function() {
			var inner;		
			inner = "<div style='display:none;'>";
			inner += "<h4 class='red'><involved>" + this.involved + "</involved> " + this.incident + "</h4>";
			inner += "<date>" + this.date + "</date><br />  ";
			inner += "<intersection>" + this.intersection + "</intersection>" + "<br />";
			inner += "<colType>" + this.colType + "</colType>" + "<br />";
			inner += "<pcf>" + this.pcf + "</pcf><br />"
			inner += "<violation>" + this.violation + "</violation>" + "<br />";
			inner += '<div class="pow"></div>' ;
			inner += "</div>";
			inner += "<img class='oIcon' src='" + this.icon +  "' />";
			return inner;
		};

	    var getUT = function() {
				var year = parseInt(this.date.substring(0,4));
	      var month = parseInt(this.date.substring(5,7));
	      var day = parseInt(this.date.substring(8,11));
	      return Date.UTC(year, month-1, day) / 1000; 
	    } 

	  	//Public Methods
		this.getMarkerHTML = getMarkerHTML; 
	    this.getUT = getUT;
		return this;
	};



	//Get XML through AJAX
  var populate = function(city) {
    var queryStr = 'query.php?city=' + city;
		$.ajax({
				type: "GET",
				url: queryStr,
				dataType: 'xml',
				success: parseXML
		});
  };



	//Parse XML, create Incident Objects, make Marker HTML, create Marker, add to arrays
	var parseXML = function(xml) {
		$(xml).find('Incident').each(function() {
			var incident = new Incident( $(this) );
			switch(incident.involved) {
				case "Bicycle":
					bikeArr.push(incident);
					break;
				case "Pedestrian":
					pedArr.push(incident);
					break;
			}
		});
	};




	var updateOverlay = function() {
      //Clear Overlays
      if(typeof showOverlay === 'object') {
        showOverlay.setMap(null);
      }
      //Clear Clusters
      if(typeof mc === 'object') {
        mc.clearMarkers();
      }
      showArr.length = 0;

      var inArr = getMarkers();
		  for( i = 0 ; i < inArr.length ; i += 1) {
			  var marker = new com.redfin.FastMarker(inArr[i].id, inArr[i].location, inArr[i].getMarkerHTML(), "marker", 1);
			  showArr.push(marker);					
      }
      if( $('#cluster').attr('checked') === false )  {
  			showOverlay = new com.redfin.FastMarkerOverlay(map, showArr);
        setTimeout(function() {
          $('.oIcon').each(function() {
              $(this).css('opacity', 0);             
          });
        }, 0);              
        setTimeout(function() {
          $('.oIcon').each(function() {
              $(this).animate({
               opacity: 0.9
              },500);
          });
        }, 100);              
      }
      resetMarkerListeners();
//      console.log('updated');
	};


  var getMarkers = function() {
    var retArr = [];
    //Bicycles
    
    if( $('#bikeLayer').attr('checked') ) {
     	for( i = 0 ; i < bikeArr.length ; i += 1) {

          if ( (bikeArr[i].getUT() >= slider.getLowRange() ) && (bikeArr[i].getUT() <= slider.getHighRange())  && (map.getBounds().contains(bikeArr[i].location)) ) {
            if( ( $('#bfa').attr('checked') ) && ( bikeArr[i].incident == 'Fatal' ) ) {
              retArr.push(bikeArr[i]);
            }
            if( $('#bhrf').attr('checked') && ( bikeArr[i].incident == 'Felony' )  ) {
              retArr.push(bikeArr[i]);
            }
            if( $('#bhrm').attr('checked') && ( bikeArr[i].incident == 'Misdemeanor' )  ) {
              retArr.push(bikeArr[i]);
            }
            if( $('#bin').attr('checked') && ( bikeArr[i].incident == 'Injury' )  ) {
              retArr.push(bikeArr[i]);
            }
            if( $('#bni').attr('checked') && ( bikeArr[i].incident == 'Non-Injury' )   ) {
              retArr.push(bikeArr[i]);
            }
          }
        }    
    }

    //Pedestrians
    if( $('#pedLayer').attr('checked') ) {
       	for( i = 0 ; i < pedArr.length ; i += 1) {
          if ( (pedArr[i].getUT() >= slider.getLowRange() ) && (pedArr[i].getUT() <= slider.getHighRange()) && (map.getBounds().contains(pedArr[i].location)) ) {
            if( ( $('#pfa').attr('checked') ) && ( pedArr[i].incident == 'Fatal' ) ) {
              retArr.push(pedArr[i]);
            }
            if( $('#phrf').attr('checked') && ( pedArr[i].incident == 'Felony' )  ) {
              retArr.push(pedArr[i]);
            }
            if( $('#phrm').attr('checked') && ( pedArr[i].incident == 'Misdemeanor' )  ) {
              retArr.push(pedArr[i]);
            }
            if( $('#pin').attr('checked') && ( pedArr[i].incident == 'Injury' )  ) {
              retArr.push(pedArr[i]);
            }
            if( $('#pni').attr('checked') && ( pedArr[i].incident == 'Non-Injury' )   ) {
              retArr.push(pedArr[i]);
            }
          }
        }    
    }
    return retArr;
  };


  var options = function() {
    var x; //timeout;

    return {
      toggle: function() {
        if( $('#options').hasClass('expanded') ){
          $('#options').removeClass('expanded');
          $('#optionsTitle').html('Menu');
          $('#optionsInner').css('display', 'none');
          $('#options').animate({ 
            height: "12px",
            width: "60px"
          }, 300); 
        }
        else {
          $('#options').addClass('expanded');
          $('#options').animate({ 
            height: "160px",
            width: "460px"
          }, 300);
          $('#optionsInner').css('display', 'block'); 
          $('#optionsTitle').html('');
        }
      },
      update: function() {
		  clearTimeout(this.x);
          this.x = setTimeout(function() {
          updateOverlay();

          var totalMarkers = 'Total Markers: ' + showArr.length;
          $('#totalMarkers').html(totalMarkers);

          //Bicycles
          if( $('#bikeLayer').attr('checked') === false ) {
            $('li.bikeLegend').children('input').each(function() {
              $(this).attr('disabled', 'disabled');
            });
          }
          else {
            $('li.bikeLegend').children('input').each(function() {
              $(this).attr('disabled', '');
            });
          }

          //Pedestrians
          if( $('#pedLayer').attr('checked') === false ) {
            $('li.pedLegend').children('input').each(function() {
              $(this).attr('disabled', 'disabled');
            });
          }
          else {
            $('li.pedLegend').children('input').each(function() {
              $(this).attr('disabled', '');
            });
          }

          //Clusters
          if( $('#cluster').attr('checked') === true) {
            drawClusters(); 
            return;
          }

        }, 800);
      }
    };

  }();



  var drawClusters = function() {
	  var mcOptions = {
		  gridSize: 65,
		  maxZoom: 20,
      zoomOnClick: false,
		  styles: [
		  {
			  url: 'images/icons/cluster-S.png',
			  height: 50,
			  width: 50,
			  anchor: [0,0],
			  textColor: '#333333'
		  },
		  {
			  url: 'images/icons/cluster-M.png',
			  height: 90,
			  width: 90,
			  anchor: [0,0],
			  textColor: '#222222'
		  },
		  {
			  url: 'images/icons/cluster-L.png',
			  height: 120,
			  width: 120,
			  anchor: [0,	0],
			  textColor: '#000000'
		  }]
	  };
    mc = new MarkerClusterer(map, showArr, mcOptions);
  };




  var addListeners = function() {
    google.maps.event.addListener(map, 'zoom_changed', function() {
     checkState();	
    });

    google.maps.event.addListener(map, 'dragend', function() { 
      options.update();
  	});


  	$('input.check').change( function() { options.update() });
    $('#closeOpts').click( function() { options.toggle() });
  };


 


  var checkState = function() {
    if(  (map.getZoom() > 14) && ( $('#cluster').attr('checked') ) && (mc.getTotalClusters() != 0  ) ) {
      $('#cluster').attr('checked', '');
      options.toggle();
    }

// MAX ZOOM IN
    if(map.getZoom() > 17) {
     map.setZoom(17);
    }
    // MAX ZOOM OUT
    if(map.getZoom() < 15) {
      map.setZoom(15);
    }
    options.update();
   	resetMarkerListeners();
    toolTip.hide();
  };



  var resetMarkerListeners = function() {
    $('div.marker').unbind();
    clearTimeout(t);
    t = setTimeout(function() {
	    $('div.marker').click( function() { 
	     toggleSingleMarker($(this));
	    });
			$('div.marker').mouseover( function(e) { 
          toolTip.hover( $(this), e );
	 	  });
	 		$('div.marker').mouseout(	function(e) {
          toolTip.hide( $(this), e );
	 		});
    }, 1800);
  };

  //slider is a jQuery slider ui object. 
  var slider = function() {
    return {
	    init: function() {
		    $( "#slider-range" ).slider({
			    range: true,
			    min: 1138867200, //Feb 2, 2006
			    max: 1296547200, //Feb 1, 2011
			    values: [ 1262332800, 1296547200 ],
			    step: 86400,
			    slide: this.updateRange
		    });
        this.updateDisplay();
	    },

	    updateRange: function( event, ui ) {
        slider.updateDisplay();
        options.update()
	    },

      updateDisplay: function() {
        low = new Date( this.getLowRange() * 1000 );
        high = new Date( this.getHighRange() * 1000 );
		    $( "#amount" ).text( low.toDateString() + " - " + high.toDateString() ); 
		    $( "#topperDateRange" ).text( low.toDateString() + " - " + high.toDateString() ); 
      },

      getLowRange: function() {
        return $("#slider-range").slider("values", 0);
      },
      getHighRange: function() {
        return $("#slider-range").slider("values", 1);
      }
   }
  }();

  var toolTip = function() {
      var s; // timeout holder

      return {
        init: function() {
          console.log('toolTip');
        },
        hover: function(obj, e) {
	        if(this.hasMarkerInfo(obj) == false) {
		        if($('#toolTip').hasClass('hidden')) { 
			        this.s = setTimeout(function() {
			          $('#toolTip').removeClass('hidden');
			          $('#toolTip').css('left', e.pageX +5);
				        $('#toolTip').css('top', (e.pageY - 30 ));
				        var coltype = $(obj).find('coltype').html();
				        var pcf = $(obj).find('pcf').html();
				        var involved = $(obj).find('involved').html();
                if(involved == "Bicycle") {
          				str = '<img src="images/icons/bike.png" height="20" width="20" alt="" />';
                }
                else{
          				str = '<img src="images/icons/ped.png" height="20" width="20" alt="" />';
                }
				        str += '<div class="toolTipInfo">' + coltype + " : " + pcf + '</div>'; 
				        $('#toolTip').html(str);
			        }, 700);	
		        }
	        }
        },
        hide: function() {
      	  clearTimeout(this.s);
      	  $('#toolTip').addClass('hidden'); 
        },
        hasMarkerInfo: function(obj) {
      	  return $(obj).next('div').hasClass('infoWindow');
        }
      };        

  }();


  var toggleSingleMarker = function(obj) {	
    state = $(obj).next().hasClass('infoWindow');
    switch(state) {
      case false:
        randHit(obj);
        var top =  (parseInt($(obj).css('top')) - 95) + "px";
        var left = (parseInt($(obj).css('left')) + 10) + "px";
        var infoW = document.createElement('div');
        $(infoW).addClass('infoWindow');
        $(infoW).css('top', top);
        $(infoW).css('left', left);
        var info =  $(obj).children().first().html();
        if(   info.indexOf('Bicycle') != -1 ) {
         info += '<object class="svgobj" data="images/icons/bike.svg" type="image/svg+xml" height="50" width="50"><img src="images/icons/bike.png" height="20" width="20" alt="" /></object>';
        }
        else {
          info += '<object class="svgobj" data="images/icons/ped.svg" type="image/svg+xml" height="40" width="30"><img src="images/icons/ped.png" height="20" width="20" alt="" /></object>';
        }
        info += '<object class="svgobj" data="images/icons/car2.svg" type="image/svg+xml" height="50" width="50"><img src="images/icons/car.png" height="20" width="20" alt="" /></object>';
        $(infoW).html(info);
        obj.after(infoW);
        $(obj).next('div').animate({
          opacity: '.9',  
          height: '135px'
        }, 200);
        break;

      case true:
        var top = $(obj).next('div').css('top');
        $(obj).next('div').animate({
          height: '0',
          top: top,
          opacity: '0'
        }, 140);
        setTimeout(function() {$(obj).next('div').remove();},150);
        break; 
    }
    toolTip.hide();
  };

  var randHit = function(obj) {
        var pow = $(obj).find('div.pow');
        var top = 103
        var left = 45
        if(Math.random() >= 0.5) t = 1;
        else t = -1;
        if(Math.random() >= 0.5) l = 1;
        else l = -1;
        var randTop = top + (Math.floor(Math.random()*15+1) * t) + "px";
        var randLeft = left + (Math.floor(Math.random()*5+1) * l) + "px"; 
        pow.css('top', randTop);
        pow.css('left', randLeft);
  };
	
  



}


