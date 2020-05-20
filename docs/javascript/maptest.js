
//we execute when the csv is open
d3.csv('data/Police_Stations.csv')
      .on('load', function (data) {

  //set map view on Chicago
  var mymap = L.map('maptest').setView([41.8119, -87.6873], 9);

  //set the map image
  mymap.addLayer(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
              attribution: '© OpenStreetMap contributors',
              maxZoom: 19
          }));

  //set the marker
  data.forEach(function(val) {
    var stationsMaker = L.marker(
      [val.LATITUDE, val.LONGITUDE]
      ).addTo(mymap);
  });

}).get();
