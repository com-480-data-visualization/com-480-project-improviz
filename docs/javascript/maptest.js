var heat
var mymap
var current_layers = []

// variables for heatmap animations
var heatmap_file_number = 1
var current_heatmap = null
var month_heatmap = 1, year_heatmap = 2001
var interval_heatmap
var current_sdatemap = null
var year_sdatemap = 2001
var interval_sdatemap
// Selection menus
var selectDate = document.getElementById('dateSelect')
var selectType = document.getElementById('typeSelect')
var selectSpecialDate = document.getElementById('sdateSelect')
var currentYear = document.getElementById('cyear')

// houses
var houses_layers = []




var areas_to_id = {'PORTAGE PARK': 15, 'WEST ENGLEWOOD': 67, 'ENGLEWOOD': 68, 'WASHINGTON PARK': 40, 'HUMBOLDT PARK': 23, 'GRAND BOULEVARD': 38, 'UPTOWN': 3, 'SOUTH SHORE': 43, 'NORTH CENTER': 5, 'NEAR WEST SIDE': 28, 'ALBANY PARK': 14, 'WEST TOWN': 24, 'LOGAN SQUARE': 22, 'NEAR NORTH SIDE': 8, 'NORTH LAWNDALE': 29, 'PULLMAN': 50, 'AUBURN GRESHAM': 71, 'NEW CITY': 61, 'WEST LAWN': 65, 'LOWER WEST SIDE': 31, 'AUSTIN': 25, 'WEST RIDGE': 2, 'EAST GARFIELD PARK': 27, 'KENWOOD': 39, 'DOUGLAS': 35, 'WOODLAWN': 42, 'BELMONT CRAGIN': 19, 'OAKAND': 36, 'ROSELAND': 49, 'LAKEVIEW': 6, 'LOOP': 32, 'NORTH PARK': 13, 'SOUTH DEERING': 51, 'GARFIELD RIDGE': 56, 'BRIDGEPORT': 60, 'LINCOLN SQUARE': 4, 'SOUTH CHICAGO': 46, 'WEST GARFIELD PARK': 26, 'HYDE PARK': 41, 'NEAR SOUTH SIDE': 33, 'ROGERS PARK': 1, 'MONTCLARE': 18, 'WEST PULLMAN': 53, 'AVALON PARK': 45, 'CHICAGO LAWN': 66, 'EDGEWATER': 77, 'WASHINGTON HEIGHTS': 73, 'HEGEWISCH': 55, 'SOUTH LAWNDALE': 30, 'GAGE PARK': 63, 'CHATHAM': 44, 'WEST ELSDON': 62, 'AVONDALE': 21, 'FULLER PARK': 37, 'GREATER GRAND CROSSING': 69, 'ASHBURN': 70, 'IRVING PARK': 16, 'RIVERDALE': 54, 'NORWOOD PARK': 10, 'JEFFERSON PARK': 11, 'BRIGHTON PARK': 58, 'DUNNING': 17, 'LINCOLN PARK': 7, 'EDISON PARK': 9, 'FOREST GLEN': 12, 'HERMOSA': 20, 'ARMOUR SQUARE': 34, 'BURNSIDE': 47, 'CALUMET HEIGHTS': 48, 'EAST SIDE': 52, 'ARCHER HEIGHTS': 57, 'MCKINLEY PARK': 59, 'CLEARING': 64, 'BEVERLY': 72, 'MOUNT GREENWOOD': 74, 'MORGAN PARK': 75, 'OHARE': 76}

function disableMapButtons () {
  for (var b of document.getElementsByTagName('button')) {
    b.disabled = true
  }
}

function enableMapButtons () {
  for (var b of document.getElementsByTagName('button')) {
    b.disabled = false
  }
}

function startLoadOverlay () {
  document.getElementById('load_overlay').style.display = 'block'
}

function stopLoadOverlay () {
  document.getElementById('load_overlay').style.display = 'none'
}

// set map view on Chicago

function sleep (milliseconds) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

function create_map () {
  mymap = L.map('map').setView([41.8119, -87.6873], 9)
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

// -------------- DISPLAY HEATMAPS POLICE STATIONS ---------------------
function display_one_heatmap (data) {
  if (current_heatmap != null) {
    mymap.removeLayer(current_heatmap)
  }
  current_heatmap = L.heatLayer(data[year_heatmap.toString()][month_heatmap.toString()], {radius: 25, gradient: {0.4: 'yellow', 0.65: 'orange', 1: 'purple'}}).addTo(mymap)
  month_heatmap = (month_heatmap + 1) % 13
  if (month_heatmap == 0) {
    month_heatmap = 1
    year_heatmap++
  }
}

function display_heatmap (data) {
  console.log(year_heatmap)
  console.log(month_heatmap)

  display_one_heatmap(data)

  if ((year_heatmap == 2006) && (month_heatmap == 1)) {
    console.log('change to 2006')
    clearInterval(interval_heatmap)
    startLoadOverlay()
    animate_heatmaps('data/heatmap_2006_2010.json')
    return
  } if ((year_heatmap == 2011) && (month_heatmap == 1)) {
    console.log('change to 2011')
    clearInterval(interval_heatmap)
    startLoadOverlay()
    animate_heatmaps('data/heatmap_2011_2015.json')
    return
  } if ((year_heatmap == 2016) && (month_heatmap == 1)) {
    console.log('change to 2016')
    clearInterval(interval_heatmap)
    startLoadOverlay()
    animate_heatmaps('data/heatmap_2016_2020.json')
    return
  } else if (year_heatmap == 2020) {
    console.log('should stop')
    year_heatmap = 2001
    month_heatmap = 1
    enableMapButtons()
    clearInterval(interval_heatmap)
    return
  }
}

// function animate_heatmaps (data) {
//   console.log('dataset heatmaps loaded')
//   interval_heatmap = setInterval(display_heatmap, 10, data)
// }

function animate_heatmaps (filepath) {
  console.log('animate:')
  console.log(filepath)
  console.log('interval heatmap')
  console.log(interval_heatmap)
  d3.json(filepath, function (data) {
    console.log('file loaded')
    stopLoadOverlay()
    interval_heatmap = setInterval(display_heatmap, 10, data)
  })
}

// function called by button
function displayHouses (checkboxElem) {
  startLoadOverlay()
  disableMapButtons()

  var layers
  var layer_id = 0

  if (checkboxElem.checked) {
    d3.csv('data/houses.csv', function (houses_row) {
      current_layer = null

    // set the marker
      houses_row.forEach(function (val) {
        var stationsMarker = L.marker(
        [val.Latitude, val.Longitude]).addTo(mymap)
        houses_layers.push(stationsMarker)
      })
      enableMapButtons()
      stopLoadOverlay()
    })
  } else {
    houses_layers.forEach(function (marker) {
      mymap.removeLayer(marker)
    })
    houses_layers = []
		enableMapButtons()
    stopLoadOverlay()
  }
}

// function called by button
function show_police_stations () {
  startLoadOverlay()
  clear_map()
  disableMapButtons()

  var layers
  var layer_id = 0

  d3.csv('data/Police_Stations.csv', function (police_rows) {
    current_layer = null

    // set the marker
    police_rows.forEach(function (val) {
      var stationsMarker = L.marker(
        [val.LATITUDE, val.LONGITUDE],
        {icon: policeIcon}).addTo(mymap)
      current_layers.push(stationsMarker)
    })
  })

  console.log('police ok')
  animate_heatmaps('data/heatmap_2001_2005.json')
}

// -------------- END HEATMAPS POLICE STATIONS ---------------------

// AREAS

function show_areas () {
  startLoadOverlay()
  disableMapButtons()

  var d = document.getElementById('dateSelect')
  var date = d.options[d.selectedIndex].value
  var t = document.getElementById('typeSelect')
  var type = t.options[t.selectedIndex].value
  var year = date.split('/')
  var filename = 'data/crimes_by_type_year' + year[2] + '.csv'
  clear_map()

  // geojson for area
  d3.csv(filename).on('load', function (data) {
    function color_areas_by_filter (date, type, area_id) {
      var nb_crimes = 0
      data.forEach(function (row) {
        if ((row.Date == date) && (row['Community Area'] == area_id) && (row['Primary Type'] == type)) {
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
      return {
        weight: 2,
        opacity: 0.30,
        color: 'white',
        fillOpacity: 0.15,
        fillColor: color_areas_by_filter(date, type, feature.properties.area_numbe)
      }
    }

    current_layers.push(L.geoJSON(areas, {style: style}).addTo(mymap))
    stopLoadOverlay()
    enableMapButtons()
  }).get()
}

// SPECIAL DATES

function display_sdate (data, sdate) {
  console.log(year_sdatemap)
  console.log(sdate)
  //currentYear.innerHTML = year_sdatemap.toString();
  //currentYear.style.display = 'block'
  if (year_sdatemap == 2020) {
    year_sdatemap = 2001
    month_sdatemap = 1
    console.log('should stop')
    clearInterval(interval_sdatemap)
    enableMapButtons()
  } else {
    if (current_sdatemap != null) {
      mymap.removeLayer(current_sdatemap)
    }
    console.log('length')
    console.log(data[year_sdatemap.toString()][sdate].length)
    current_sdatemap = L.heatLayer(data[year_sdatemap.toString()][sdate], {radius: 25, gradient: {0.2: 'blue', 0.35: 'yellow', 0.55: 'orange', 1: 'purple'}}).addTo(mymap)
    year_sdatemap++
  }
}

function animate_sdatemaps (data, sdate) {
  console.log('dataset sdates loaded')
  interval_sdatemap = setInterval(display_sdate, 1000, data, sdate)
}

function show_sdates () {
  startLoadOverlay()
  disableMapButtons()
  var sd = document.getElementById('sdateSelect')
  var sdate = sd.options[sd.selectedIndex].value
  clear_map()

  d3.json('data/sdates_json.json', function (data) {
    stopLoadOverlay()
    animate_sdatemaps(data, sdate)
  })
}

var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var monthDaysBis = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

for (var y = 2001; y <= 2019; y++) {
  for (var m = 1; m <= 12; m++) {
    if (y % 4 == 0) {
      for (d = 1; d <= monthDaysBis[m - 1]; d++) {
        if (d < 10) {
          var day = '0' + d.toString(10)
        } else {
          var day = d.toString(10)
        }
        if (m < 10) {
          var month = '0' + m.toString(10)
        } else {
          var month = m.toString(10)
        }
        var val = day + '/' + month + '/' + y.toString(10)
        var option = document.createElement('option')
        option.value = val
        option.text = val
        selectDate.appendChild(option)
      }
    } else {
      for (d = 1; d <= monthDays[m - 1]; d++) {
        if (d < 10) {
          var day = '0' + d.toString(10)
        } else {
          var day = d.toString(10)
        }
        if (m < 10) {
          var month = '0' + m.toString(10)
        } else {
          var month = m.toString(10)
        }
        var val = day + '/' + month + '/' + y.toString(10)
        var option = document.createElement('option')
        option.value = val
        option.text = val
        selectDate.appendChild(option)
      }
    }
  }
}

d3.json('data/types_json.json', function (data) {
  var t = data['types']
  for (i = 0; i < t.length; i++) {
    var option = document.createElement('option')
    option.value = t[i]
    option.text = t[i]
    selectType.appendChild(option)
  }
})

d3.json('data/sdates_json.json', function (data) {
  Object.keys(data[2001]).forEach(function (key) {
    var option = document.createElement('option')
    option.value = key
    option.text = key
    selectSpecialDate.appendChild(option)
  })
})

create_map()
