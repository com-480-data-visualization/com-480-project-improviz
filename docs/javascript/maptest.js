
//they are shifted from the true location
var policeIcon = L.icon({
  iconUrl: 'img/police-icon2.png',

  iconSize:     [50, 50], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


//set map view on Chicago
var mymap = L.map('mapsection').setView([41.8119, -87.6873], 9);

//dark theme
var theme = L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=2NizdI0VAUG9D62DlxhMK39Bs6ls6oqXlsL90NH46qvp5MFKPNEJXxpym8uTO7Dr', {
        attribution: '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> | <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
        maxZoom: 22,
        minZoom: 10,
      });

//set the map image
mymap.addLayer(theme);

//AREAS

function style(feature) {
  return {
       weight: 2,
       opacity: 0.65,
       color: 'white',
       fillOpacity: 0.7,
       fillColor: '#800922' //Here to do the colors with the valuer on csv
   };
}

//geojson for area
L.geoJSON(areas, {style: style}).addTo(mymap);


//MARKERS

//we execute when the csv is open
d3.csv('data/Police_Stations.csv')
      .on('load', function (data) {

  //set the marker
  data.forEach(function(val) {
    var stationsMaker = L.marker(
      [val.LATITUDE, val.LONGITUDE],
      {icon: policeIcon}).addTo(mymap);
  });

}).get();

//HEATMAP

//we execute when the csv is open
d3.csv('data/heattest.csv')
      .on('load', function (data) {

  var t = []
  //set the marker
  data.forEach(function(val) {
    t.push([val.Latitude, val.Longitude, 1])
  });

  //heatmap plot
  var heat = L.heatLayer(t, {radius: 25, gradient: {0.4: 'yellow', 0.65: 'orange', 1: 'purple'}}).addTo(mymap);

}).get();
