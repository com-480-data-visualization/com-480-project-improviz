var heat;
var mymap;
var current_layers = [];

//set map view on Chicago
mymap = L.map('map').setView([41.8119, -87.6873], 9);

function test() {
  console.log("OYOYO");
}

function create_map(){
  //dark theme
  var theme = L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=2NizdI0VAUG9D62DlxhMK39Bs6ls6oqXlsL90NH46qvp5MFKPNEJXxpym8uTO7Dr', {
          attribution: '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> | <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
          maxZoom: 22,
          minZoom: 10,
        });

  //set the map image
  mymap.addLayer(theme);

}

function clear_map(){
  current_layers.forEach((layer) => {
    mymap.removeLayer(layer);
  });
}

//SHOW POLICE STATION
function show_police_stations(){
  d3.csv('data/Police_Stations.csv')
        .on('load', function (data) {

    clear_map();

    //set the marker
    data.forEach(function(val) {
      var stationsMarker = L.marker(
        [val.LATITUDE, val.LONGITUDE],
        {icon: policeIcon}).addTo(mymap);
      current_layers.push(stationsMarker)
    });
  }).get();
}

//SHOW HEATMAP
function show_heatmap(){
  //we execute when the csv is open
  d3.csv('data/heattest.csv')
        .on('load', function (data) {

    clear_map();

    var t = []
    //set the marker
    data.forEach(function(val) {
      t.push([val.Latitude, val.Longitude, 1])
    });

    //heatmap plot
    current_layers.push(L.heatLayer(t, {radius: 25, gradient: {0.4: 'yellow', 0.65: 'orange', 1: 'purple'}}).addTo(mymap));

  }).get();
}

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

function show_areas(){
  clear_map();
  //geojson for area
  current_layers.push(L.geoJSON(areas, {style: style}).addTo(mymap));
}


create_map();
