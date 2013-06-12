;(function($) {
	$.fn.gMapper = function(options) {
		
		var mapTypes = {
			"ROADMAP": google.maps.MapTypeId.ROADMAP,
			"SATELLITE": google.maps.MapTypeId.SATELLITE,
			"HYBRID": google.maps.MapTypeId.HYBRID,
			"TERRAIN": google.maps.MapTypeId.TERRAIN
		};
		
		var controls = {
			panControl: true,
			zoomControl: true,
			scaleControl: true,
			streetControl: false
		};
			  
		var defaults = {
		  width: 400,
		  height: 300,
		  type: "ROADMAP",
		  zoom: 12,
		  icon: 'http://isite.dev.allegranet.com/Portals/_default/Skins/Allegra_Default/images/map_logo.png'
		};

		var options = $.extend(true, defaults, options, $(this).data());
	  
	    var mapOptions = {
			zoom: options.zoom,
			mapTypeId: mapTypes[options.type]
	    };
		
		
	  
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
