var map;
  require([
    "esri/map", "esri/dijit/Scalebar", "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/BasemapToggle", "dojo/domReady!",
  ], function(
    Map, Scalebar, ArcGISDynamicMapServiceLayer, BasemapToggle
  ) {
    map = new Map("map", {
      basemap: "topo",
      center: [-90, 30],
      zoom: 4
    });

    var toggle = new BasemapToggle({
      map: map,
      basemap: "satellite"
    }, "BasemapToggle");
    toggle.startup();

    var WindDirection = new ArcGISDynamicMapServiceLayer("https://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NOAA_METAR_current_wind_speed_direction/MapServer");

    map.addLayer(WindDirection);

    var scalebar = new Scalebar({
      map: map,
      scalebarUnit: "dual"
    });
 });
