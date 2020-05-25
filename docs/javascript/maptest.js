var heat
var mymap
var current_layers = []

var areas_to_id = {'PORTAGE PARK': 15, 'WEST ENGLEWOOD': 67, 'ENGLEWOOD': 68, 'WASHINGTON PARK': 40, 'HUMBOLDT PARK': 23, 'GRAND BOULEVARD': 38, 'UPTOWN': 3, 'SOUTH SHORE': 43, 'NORTH CENTER': 5, 'NEAR WEST SIDE': 28, 'ALBANY PARK': 14, 'WEST TOWN': 24, 'LOGAN SQUARE': 22, 'NEAR NORTH SIDE': 8, 'NORTH LAWNDALE': 29, 'PULLMAN': 50, 'AUBURN GRESHAM': 71, 'NEW CITY': 61, 'WEST LAWN': 65, 'LOWER WEST SIDE': 31, 'AUSTIN': 25, 'WEST RIDGE': 2, 'EAST GARFIELD PARK': 27, 'KENWOOD': 39, 'DOUGLAS': 35, 'WOODLAWN': 42, 'BELMONT CRAGIN': 19, 'OAKLAND': 36, 'ROSELAND': 49, 'LAKEVIEW': 6, 'LOOP': 32, 'NORTH PARK': 13, 'SOUTH DEERING': 51, 'GARFIELD RIDGE': 56, 'BRIDGEPORT': 60, 'LINCOLN SQUARE': 4, 'SOUTH CHICAGO': 46, 'WEST GARFIELD PARK': 26, 'HYDE PARK': 41, 'NEAR SOUTH SIDE': 33, 'ROGERS PARK': 1, 'MONTCLARE': 18, 'WEST PULLMAN': 53, 'AVALON PARK': 45, 'CHICAGO LAWN': 66, 'EDGEWATER': 77, 'WASHINGTON HEIGHTS': 73, 'HEGEWISCH': 55, 'SOUTH LAWNDALE': 30, 'GAGE PARK': 63, 'CHATHAM': 44, 'WEST ELSDON': 62, 'AVONDALE': 21, 'FULLER PARK': 37, 'GREATER GRAND CROSSING': 69, 'ASHBURN': 70, 'IRVING PARK': 16, 'RIVERDALE': 54, 'NORWOOD PARK': 10, 'JEFFERSON PARK': 11, 'BRIGHTON PARK': 58, 'DUNNING': 17, 'LINCOLN PARK': 7, 'EDISON PARK': 9, 'FOREST GLEN': 12, 'HERMOSA': 20, 'ARMOUR SQUARE': 34, 'BURNSIDE': 47, 'CALUMET HEIGHTS': 48, 'EAST SIDE': 52, 'ARCHER HEIGHTS': 57, 'MCKINLEY PARK': 59, 'CLEARING': 64, 'BEVERLY': 72, 'MOUNT GREENWOOD': 74, 'MORGAN PARK': 75, 'OHARE': 76}

// set map view on Chicago
mymap = L.map('map').setView([41.8119, -87.6873], 9)

function test () {
  console.log('OYOYO')
}

function create_map () {
  // dark theme
  var theme = L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=2NizdI0VAUG9D62DlxhMK39Bs6ls6oqXlsL90NH46qvp5MFKPNEJXxpym8uTO7Dr', {
    attribution: '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> | <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
    maxZoom: 22,
    minZoom: 10
  })

  // set the map image
  mymap.addLayer(theme)
}

function clear_map () {
  current_layers.forEach((layer) => {
    mymap.removeLayer(layer)
  })
}

// SHOW POLICE STATION
function show_police_stations () {
  d3.csv('data/Police_Stations.csv')
        .on('load', function (data) {
          clear_map()

    // set the marker
          data.forEach(function (val) {
            var stationsMarker = L.marker(
        [val.LATITUDE, val.LONGITUDE],
        {icon: policeIcon}).addTo(mymap)
            current_layers.push(stationsMarker)
          })


          d3.json('data/heatmap_json.json').on('load', function (data) {
            console.log(data["2019"]["1"])

          current_layers.push(L.heatLayer(data["2019"]["1"], {radius: 25, gradient: {0.4: 'yellow', 0.65: 'orange', 1: 'purple'}}).addTo(mymap))
          }).get();


        }).get()
}



function test_heatmap(){

}



// SHOW HEATMAP
function show_heatmap () {
  // we execute when the csv is open
  d3.csv('data/heattest.csv')
        .on('load', function (data) {
          clear_map()

          var t = []
    // set the marker
          data.forEach(function (row) {
            t.push([row.Latitude, row.Longitude, 1])
          })

    // heatmap plot
          current_layers.push(L.heatLayer(t, {radius: 25, gradient: {0.4: 'yellow', 0.65: 'orange', 1: 'purple'}}).addTo(mymap))
        }).get()
}



// AREAS

function show_areas () {
  filename = 'data/crimes_by_type_year_2002.csv'
  type = 'OFFENSE INVOLVING CHILDREN'
  date = '01/01/2002'
  clear_map()

  // geojson for area
  d3.csv(filename).on('load', function (data) {
    function color_areas_by_filter (date, type, area_id) {
      var nb_crimes = 0
      // console.log(area_id)
      data.forEach(function (row) {
        if ((row.Date == date) && (row.Community_Area == area_id) && (row.Type == type)) {
          nb_crimes = nb_crimes + parseInt(row.Number)
        }
        // possible d'optimiser avec un break comme les csv sont triés par areas
      })

      return nb_crimes > 5 ? '#FF0000' :
       nb_crimes > 1 ? '#FF9F00' :
       nb_crimes > 0 ? '#FFFF00' :
                  '#0000FF'
    }

    function style (feature) {
      //console.log(feature.properties.pri_neigh)
      return {
        weight: 2,
        opacity: 0.30,
        color: 'white',
        fillOpacity: 0.15,
        fillColor: color_areas_by_filter(date, type, feature.properties.area_numbe)
      }
    }

    current_layers.push(L.geoJSON(areas, {style: style}).addTo(mymap))
  }).get()
}

create_map()
