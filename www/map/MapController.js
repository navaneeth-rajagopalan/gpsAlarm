angular.module("Map")
.controller("mapCtrl", ["$scope", "mapSvc", "mapCtrlPosSvc", function($scope, mapSvc, mapCtrlPosSvc){
    var currentPlaceIndex = 0,
        numPlaces = 0;
    $scope.mapService = mapSvc;
    $scope.hasMultiPlaces = false;
    $scope.foundPlace = false;
    $scope.showingPlaceDetails = false;

    // Initialize the map and set the Map Centre co-ordinates to client"s geo location if data available.
    if (navigator.geolocation) {           
        navigator.geolocation.getCurrentPosition(function (position) {
            mapSvc.initializeMap({mapId: "map", geoLat: position.coords.latitude, geoLong: position.coords.longitude, fnAdjustControlsPos: adjustControlsPos});
        });        
    }
    else{
        mapSvc.initializeMap({mapId: "map", fnAdjustControlsPos: adjustControlsPos});
    }

    // Set the zoom level on search result
    mapSvc.setZoomLevel(17);

    // Initialize the controls shown inside map and their positions
    mapSvc.initControls("pac-input", 
        {id: "pac-nav-left", position: mapCtrlPosSvc["LEFT_CENTER"]},
        {id: "pac-nav-right", position: mapCtrlPosSvc["RIGHT_CENTER"]},
        {id: "pac-addPlace", position: mapCtrlPosSvc["BOTTOM_CENTER"]},
        {id: "btnShowDetails", position: mapCtrlPosSvc["RIGHT_TOP"]}); 
   
    // Watch for changes in search result.
    $scope.$watch("mapService.getPlaces()", function(newVal, oldVal){
        currentPlaceIndex = 0;
        numPlaces = newVal ? newVal.length : 0;
        if(newVal && newVal.length > 1){
            $scope.hasMultiPlaces = true;
            $scope.foundPlace = true;
        }
        else if(newVal && newVal.length == 1 ){
            $scope.hasMultiPlaces = false;
            $scope.foundPlace = true;
        }
        else{
            $scope.hasMultiPlaces = false;
            $scope.foundPlace = false;
        }
    });  
    
}]);