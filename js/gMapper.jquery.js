;(function($) {
	$.fn.gMapper = function(options) {

		var mapTypes = {
                    "ROADMAP": google.maps.MapTypeId.ROADMAP,
                    "SATELLITE": google.maps.MapTypeId.SATELLITE,
                    "HYBRID": google.maps.MapTypeId.HYBRID,
                    "TERRAIN": google.maps.MapTypeId.TERRAIN
		};
			  
		var defaults = {
		  width: 400,
		  height: 300,
		  type: "ROADMAP",
		  zoom: 12,
                  debug: false
		};

		var options = $.extend(true, defaults, options, $(this).data());
	  
                var mapOptions = {
                            zoom: options.zoom,
                            mapTypeId: mapTypes[options.type]
                };

		var geocoder = new google.maps.Geocoder();
		var map = new google.maps.Map($('#'+options.mapid)[0], mapOptions);
		
		var addMarker = function(data){
			geocoder.geocode({'address': data.address}, function(results, status){
				var loc = results[0].geometry.location;
				if(status == google.maps.GeocoderStatus.OK){
					var marker = new google.maps.Marker({
						map: map,
						position: loc
					});
					map.setCenter(loc);
				}else{
					console.log('broken: '+status);
				}
			});
		}
      
		//Perform plugin actions on every matched element
		this.each(function() {
			$('#'+options.mapid).css({width:options.width, height:options.height});
			var markers = $(this).children('.marker');
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