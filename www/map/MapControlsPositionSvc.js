angular.module("Map")
.factory("mapCtrlPosSvc", [ function(){
    return {
        TOP_CENTER: google.maps.ControlPosition.TOP_CENTER, //indicates that the control should be placed along the top center of the map.
        TOP_LEFT: google.maps.ControlPosition.TOP_LEFT, //indicates that the control should be placed along the top left of the map, with any sub-elements of the control "flowing" towards the top center.
        TOP_RIGHT: google.maps.ControlPosition.TOP_RIGHT, //indicates that the control should be placed along the top right of the map, with any sub-elements of the control "flowing" towards the top center.
        LEFT_TOP: google.maps.ControlPosition.LEFT_TOP, //indicates that the control should be placed along the top left of the map, but below any TOP_LEFT elements.
        RIGHT_TOP: google.maps.ControlPosition.RIGHT_TOP, //indicates that the control should be placed along the top right of the map, but below any TOP_RIGHT elements.
        LEFT_CENTER: google.maps.ControlPosition.LEFT_CENTER, //indicates that the control should be placed along the left side of the map, centered between the TOP_LEFT and BOTTOM_LEFT positions.
        RIGHT_CENTER: google.maps.ControlPosition.RIGHT_CENTER, //indicates that the control should be placed along the right side of the map, centered between the TOP_RIGHT and BOTTOM_RIGHT positions.
        LEFT_BOTTOM: google.maps.ControlPosition.LEFT_BOTTOM, //indicates that the control should be placed along the bottom left of the map, but above any BOTTOM_LEFT elements.
        RIGHT_BOTTOM: google.maps.ControlPosition.RIGHT_BOTTOM, //indicates that the control should be placed along the bottom right of the map, but above any BOTTOM_RIGHT elements.
        BOTTOM_CENTER: google.maps.ControlPosition.BOTTOM_CENTER, //indicates that the control should be placed along the bottom center of the map.
        BOTTOM_LEFT: google.maps.ControlPosition.BOTTOM_LEFT, //indicates that the control should be placed along the bottom left of the map, with any sub-elements of the control "flowing" towards the bottom center.
        BOTTOM_RIGHT: google.maps.ControlPosition.BOTTOM_RIGHT, //indicates that the control should be placed along the bottom right of the map, with any sub-elements of the control "flowing" towards the bottom center.
    };
}]); 