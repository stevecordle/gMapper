;(function($) {
	$.fn.gMapper = function(options) {
		
		var dataOptions = $(this).data();
		
		var mapTypes = {
			"ROADMAP": google.maps.MapTypeId.ROADMAP,
			"SATELLITE": google.maps.MapTypeId.SATELLITE,
			"HYBRID": google.maps.MapTypeId.HYBRID,
			"TERRAIN": google.maps.MapTypeId.TERRAIN
		};
		
		var controls = {};
		if(typeof dataOptions.controls === 'undefined'){
			controls = {
				zoomControl: true,
				panControl: true,
				scaleControl: true,
				mapTypeControl: true,
				rotateControl: false,
				streetViewControl: false,
				overviewMapControl: false
			}
		}else{
			var initControls = dataOptions.controls.split(',');
			for(control in initControls){
				if(initControls[control] === 'type'){
					initControls[control] = 'mapType';
				}else if(initControls[control] === 'street'){
					initControls[control] = 'streetView';
				}else if(initControls[control] === 'overview'){
					initControls[control] = 'overviewMap';
				}
				controls[initControls[control]+'Control'] = true;
			}
		}
			  
		var defaults = {
		  width: 400,
		  height: 300,
		  type: "ROADMAP",
		  zoom: 12,
		  icon: 'http://isite.dev.allegranet.com/Portals/_default/Skins/Allegra_Default/images/map_logo.png'
		};

		var options = $.extend(true, defaults, options, dataOptions);
	  
	    var mapOptions = {
			zoom: options.zoom,
			mapTypeId: mapTypes[options.type],
			zoomControl: false,
			panControl: false,
			scaleControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			rotateControl: false,
			overviewMapControl: false
	    };
		
		$.extend(mapOptions, controls);
	  
		var geocoder = new google.maps.Geocoder();
		var map = new google.maps.Map($('#'+options.mapid)[0], mapOptions);
			  
		var getLatLon = function(address, callback){
			geocoder.geocode({'address':address},function(results, status){
				var location = results[0].geometry.location;
				if(status == google.maps.GeocoderStatus.OK){
					addresses.push(location);
				}else{
					showError(status);
				}
				if(callback)
					callback(location);
			});
		}
		
		var showError = function(error){
			alert('gMapper Error: '+error);
		}
		
		var addMarker = function(data){
			geocoder.geocode({'address': data.address}, function(results, status){
				var loc = results[0].geometry.location;
				if(status == google.maps.GeocoderStatus.OK){
					var marker = new google.maps.Marker({
						map: map,
						position: loc,
						icon: options.icon
					});
					addToolTip(marker, data.html);
                    if(data.center === true)
						map.setCenter(loc);
				}else{
					showError(status);
				}
			});
		}
		
		var addToolTip = function(marker, message){
		    var infowindow = new google.maps.InfoWindow({
		      content: message
		    });

		    google.maps.event.addListener(marker, 'click', function() {
		      infowindow.open(marker.get('map'), marker);
		    });
		}
      
		//Perform plugin actions on every matched element
		this.each(function() {
			$('#'+options.mapid).css({width:options.width, height:options.height})
			           .parent().css({width:options.width, height:options.height});
			var markers = $(this).children('.marker');
			markers.hide();
			markers.each(function(){
				var data = $(this).data();
				data.html = $(this).html();
				addMarker(data);
			});
		});
      
		// this.data('compose', {
		// 	   getLatLon: getLatLon
		// });
      
		return this;
	}
})(jQuery);
