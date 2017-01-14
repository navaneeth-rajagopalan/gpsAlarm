angular.module("Map")
.service("mapSvc", ["$rootScope", function($rootScope){
    var input,
        buttons = [],
        searchBox,
        places,
        markers = [],
        map,
        mapControlPos = {},
        zoom = 17;

    // Search for selected location
    function searchLocations(){        
        places = searchBox.getPlaces();
        $rootScope.$apply();        
    };
    
    // Clears existing markers
    function clearMarkers(){
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
    };

    // Add Marker
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    };

    // Search for location and mark the first result
    function searchAndMark() {        
        searchLocations();        
        // Mark first location in Map
        var arr = [];        
        markLocation(places.slice(0, 1)[0]); 
        $rootScope.$apply();       
    };

    // Adjust zoom of the new location
    function adjustZoom(){
        google.maps.event.addListenerOnce(map, "idle", function() { 
            if (map.getZoom() > zoom){
                map.setZoom(zoom);
            }
        });
    }

    // Mark the location in Map
    markLocation = function(placeToMark){
        // Clear old markers
        clearMarkers();
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        if(!placeToMark.geometry){
            return;
        }       

        addMarker(placeToMark.geometry.location);

        if (placeToMark.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(placeToMark.geometry.viewport);
        }
        else {
            bounds.extend(placeToMark.geometry.location);
        }
            
        map.fitBounds(bounds);
        adjustZoom();
    };

    // return the current places array
    this.getPlaces = function(){
        return places;
    };    

    // Set zoom level
    this.setZoomLevel = function(zoomLevel){
        zoom = zoomLevel;
    };

    // Recentre the map to current width
    this.reCentreMap = function(){
        var currCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currCenter);
    }
    // Expose markLocation method
    this.markLocation = markLocation;

    // Initialize the Map.
    this.initializeMap = function({mapId, geoLat = 28.7041, geoLong = 77.1025, zoom = 15, mapType = "roadmap", fnAdjustControlsPos = undefined}) {
        map = new google.maps.Map(document.getElementById(mapId), {
          center: {lat: geoLat, lng: geoLong},
          zoom: zoom,
          mapTypeId: mapType
        });

        // Create the search box and link it to the UI element.
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        
        buttons.forEach(function(button){
            map.controls[button.controlPosition].push(button.element);
        });
        // Bias the SearchBox results towards current map"s viewport.
        map.addListener("bounds_changed", function() {
          searchBox.setBounds(map.getBounds());
        });
        fnAdjustControlsPos();
        // Clicks on Map will add marker at the place
        // map.addListener("click", function(event) {
        //     clearMarkers();
        //     addMarker(event.latLng);
        // });
        
        // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
        searchBox.addListener("places_changed", searchAndMark);        
      };

      // Initialize the controls shown on Map
      this.initControls = function(searchFieldId, ...buttonIds){
          var buttonsCount = buttonIds.length;
          input = document.getElementById(searchFieldId);
          searchBox = new google.maps.places.SearchBox(input);
          if(buttonsCount > 0){              
              for (var index = 0; index < buttonsCount; index++) {
                  buttons.push(
                      {element: document.getElementById(buttonIds[index].id),
                        controlPosition: buttonIds[index].position});
              }              
          }
      }
}]);