jQuery Plugin for Google Maps: gMapper
=======

List of data attributes for map wrapper
----------------
<div class="mapper"></div>
		
data-mapid:    ID of the map			
data-type:     Type of map Value: (ROADMAP/SATELLITE/HYBRID/TERRAIN)				
data-zoom:     Zoom Value: (1-16)				
data-width:    Width of the map Value: (Number only, don't add px)
data-height:   Height of the map Value: (Number only, don't add px)
data-controls: Controls to add to the map Value: (separated by commas: pan,zoom,scale,street

List of data attributes for map markers
------------
<span class="marker"></span>

You must add class="marker" to each marker element, elements can be anything (div/span/p/etc).

data-address:    Address for the marker Value: (Address)
data-icon:       Icon to use for the marker Value: (url of image)
data-center:     Center the map on this marker (Only choose one marker to center on) Value: true
data-width:      Width of the map (Number only, don't add px)
Inside the span: Will show in the info window that pops up after clicking on the marker (Can use HTML)