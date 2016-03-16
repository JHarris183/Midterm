// Create a map with given latitude and longitude with zoom level
var map = L.map('map').setView([36, -90], 4);

// Tile layer for open street maps
var streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var satellite = L.tileLayer( 'http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
	type: 'sat',
	ext: 'jpg',
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
	subdomains: '1234'
});

// Weather watches and warnings creation from WMS
var WatchesWarningsAdvisories = L.tileLayer.wms("https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/WMSServer", {
    layers: '0',
    format: 'image/png',
    transparent: true,
    attribution: "National Weather Service",
    opacity: 0.25,
}).addTo(map);

// Lightning density creation from WMS
var Lightning = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WMSServer", {
    layers: '1',
    format: 'image/png',
    transparent: true,
    attribution: "National Weather Service",
}).addTo(map);

//  Doppler rader creation from WMS
var Doppler = L.tileLayer.wms("https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Observations/radar_base_reflectivity/MapServer/WMSServer", {
    layers: '1',
    format: 'image/png',
    transparent: true,
    attribution: "National Weather Service",
}).addTo(map);

var earthquakes = L.layerGroup();

function addpopup( feature, layer ){
  var html = feature.properties.mag + " magnitude, " + feature.properties.place;
  layer.bindPopup( html );
}

$.getJSON( "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", function( geojsonFeatures ){
  L.geoJson( geojsonFeatures, { onEachFeature: addpopup } ).addTo(map);
});

// Basemap variable radio button
var baseMaps = {
  "OpenStreet Map": streets,
  "Satellite Map": satellite
};

// Variable selection buttons for Watches and Warnings, Lightning, and Doppler
var overlayMaps = {
    "Watches and Warnings": WatchesWarningsAdvisories,
    "Lightning": Lightning,
    "Doppler": Doppler,
};


//  Creates radio and check boxes for baseMaps and overlayMaps variables
L.control.layers(baseMaps, overlayMaps).addTo(map);
