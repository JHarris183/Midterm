var map;
var layers = [];

function toggleLayer(i) {
  if(layers[i].getMap() === null) {
    layers[i].setMap(map);
  }
  else {
    layers[i].setMap(null);
  }
}
function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 30, lng: -90}
  });


layers[0] = new google.maps.KmlLayer({
    url: 'http://www.spc.noaa.gov/products/fire_wx/day1fireotlk.kmz',
    map: map,
 preserveViewport: true});
layers[1] = new google.maps.KmlLayer({
    url: 'http://www.spc.noaa.gov/products/outlook/day1otlk.kmz',
    map: map,
preserveViewport: true});
}
