// create 2 data_set
var data1 = [{
    group: "ARSON",
    value: 4
  },
  {
    group: "B",
    value: 16
  },
  {
    group: "C",
    value: 8
  }
];

var data2 = [{
    group: "A",
    value: 7
  },
  {
    group: "B",
    value: 1
  },
  {
    group: "C",
    value: 20
  },
];

// set the dimensions and margins of the graph
var margin = {
    top: 0,
    right: 0,
    bottom: 40,
    left: -10
  },
  width_board = window.innerWidth - margin.left - margin.right - 20,
  height_board = 260 - margin.top - margin.bottom;

// append the svg_board object to the body of the page
var svg_board = d3.select("#the_board_bar")
  .append("svg")
  .attr("width", width_board + margin.left + margin.right)
  .attr("height", height_board + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([0, width_board])
  .padding(0.01);
var xAxis = svg_board.append("g")
  .attr("transform", "translate(0," + height_board + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([0, height_board]);
var yAxis = svg_board.append("g")
  .attr("class", "myYaxis")

var textBoardBar = svg_board.append("text")
  .attr("x", width_board / 2)
  .attr("y", 200)
  .attr("id", "textBoardBar")
  .attr("dy", "2.5em")
  .attr("font-size", "15px")
  .attr("color", "#F5F5F5")
  .style("text-anchor", "middle")
  .text("");

var savedDataCateg;
var savedThisCateg;
// A function that create / update the plot for a given variable:
function update(data, value_nb) {

  // Update the X axis
  x.domain(data.map(function(d) {
    return d.group;
  }))
  //xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) {
    if (savedDataCateg != null) {
      textBoardBar.text(savedDataCateg.group + " " + savedDataCateg[value_nb])
    }

    //console.log(Math.max(d[2002 + "-" + place_column], d[2006 + "-" + place_column]))
    //console.log(d3.max(d[2004 + "-" + place_column]))
    return Math.max(parseInt(d[2002 + "-" + place_column]), parseInt(d[2003 + "-" + place_column]), parseInt(d[2004 + "-" + place_column]), parseInt(d[2005 + "-" + place_column]), parseInt(d[2006 + "-" + place_column]), parseInt(d[2007 + "-" + place_column]), parseInt(d[2008 + "-" + place_column]), parseInt(d[2009 + "-" + place_column]))
  })]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  //textBoardBar.text(function(d) {
  //return d.group + " " + d[value_nb];
  //})
  // Create the u variable
  var u_stream = svg_board.selectAll("rect")
    .data(data)
    .attr("class", "bar_board")
    .on("mouseover", function(d) {
      savedDataCateg = d
      savedThisCateg = this
      textBoardBar.text(d.group + " " + d[value_nb])
      d3.selectAll(".bar_board").attr("fill", "#282A2D")
      d3.select(this).attr('fill', "#C57063")
    })

  u_stream
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u_stream) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(400)
    .attr("x", function(d) {
      return x(d.group);
    })
    .attr("y", function(d) {
      return 0;
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      d3.select(savedThisCateg).attr('fill', "#C57063")
      //return y(d[2005 + "-" + place_column]);
      return y(d[value_nb]);
    })
    .attr("fill", "#282A2D")


  // If less group in the new dataset, I delete the ones not in use anymore
  u_stream
    .exit()
    .remove()
  d3.select(savedThisCateg).attr('fill', "#C57063")
}


var dataset_board;
d3.csv("data/Crimes_board.csv", function(error, datapt) {
  // If error is not null, something went wrong.
  if (error) {
    console.log(error); //Log the error.
  } else {
    //console.log(datapt); //Log the data.
    dataset_board = datapt; // Give the data a global scope
    //Call some other functions that generate the visualization
  }
});

var dataset_board_down_left;
d3.csv("data/Socio_board_left.csv", function(error, datapt) {
  // If error is not null, something went wrong.
  if (error) {
    console.log(error); //Log the error.
  } else {
    //console.log(datapt); //Log the data.
    dataset_board_down_left = datapt; // Give the data a global scope
    //Call some other functions that generate the visualization
  }
});

var textBottomCat1;
var textBottomCat2;
var textBottomCat3;
var textBottomCat4;
var textBottomCat5;
// Initialize the plot with the first dataset
//update(dataset_board, "2007-19.0")
//update(data1, "value")

//==========================================================================
//                    Select data
//==========================================================================


var width = 500
var height = 500
var margin = 5

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.

var radius_place = Math.min(width, height) / 2 - margin
var radius_blank_l = Math.min(width - 80, height - 80) / 2 - margin
var radius = Math.min(width - 100, height - 100) / 2 - margin
var radius_blank = Math.min(width - 180, height - 180) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg_board_select = d3.select("#the_board_select")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = {
  2002: 1,
  2003: 1,
  2004: 1,
  2005: 1,
  2006: 1,
  2007: 1,
  2008: 1,
  2009: 1,
  2010: 1,
  2011: 1,
  2012: 1,
  2013: 1,
  2014: 1,
  2015: 1,
  2016: 1,
  2017: 1,
  2018: 1,
  2019: 1,
}
var data_blank = {
  useless: 1,
}
var data_place = {
  1.0: 1,
  2.0: 1,
  3.0: 1,
  4.0: 1,
  5.0: 1,
  6.0: 1,
  7.0: 1,
  8.0: 1,
  9.0: 1,
  10.0: 1,
  11.0: 1,
  12.0: 1,
  13.0: 1,
  14.0: 1,
  15.0: 1,
  16.0: 1,
  17.0: 1,
  18.0: 1,
  19.0: 1,
  20.0: 1,
  21.0: 1,
  22.0: 1,
  23.0: 1,
  24.0: 1,
  25.0: 1,
  26.0: 1,
  27.0: 1,
  28.0: 1,
  29.0: 1,
  30.0: 1,
  31.0: 1,
  32.0: 1,
  33.0: 1,
  34.0: 1,
  35.0: 1,
  36.0: 1,
  37.0: 1,
  38.0: 1,
  39.0: 1,
  40.0: 1,
  41.0: 1,
  42.0: 1,
  43.0: 1,
  44.0: 1,
  45.0: 1,
  46.0: 1,
  47.0: 1,
  48.0: 1,
  49.0: 1,
  40.0: 1,
  41.0: 1,
  42.0: 1,
  43.0: 1,
  44.0: 1,
  45.0: 1,
  46.0: 1,
  47.0: 1,
  48.0: 1,
  49.0: 1,
  50.0: 1,
  51.0: 1,
  52.0: 1,
  53.0: 1,
  54.0: 1,
  55.0: 1,
  56.0: 1,
  57.0: 1,
  58.0: 1,
  59.0: 1,
  60.0: 1,
  61.0: 1,
  62.0: 1,
  63.0: 1,
  64.0: 1,
  65.0: 1,
  66.0: 1,
  67.0: 1,
  68.0: 1,
  69.0: 1,
  70.0: 1,
  71.0: 1,
  72.0: 1,
  73.0: 1,
  74.0: 1,
  75.0: 1,
  76.0: 1,
  77.0: 1
}

// set the color scale
var color_dark = d3.scaleOrdinal()
  .domain(data)
  //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
  .range(["#292E37", '#21242C', '#14161A', '#21242C'])

var color_light = d3.scaleOrdinal()
  .domain(data)
  //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
  .range(["#DBDBDB", '#CFCFCF', '#C7C7C7', '#CFCFCF'])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {
    return 15; //nb pie
  })
var data_ready = pie(d3.entries(data))
var data_ready_place = pie(d3.entries(data_place))
var data_ready_blank = pie(d3.entries(data_blank))

var date_column = "2002"
var place_column = "19.0"
var name_column

svg_board_select
  .selectAll('whatever')
  .data(data_ready_place)
  .enter()
  .append('path')
  .attr("class", "circle_categ_board")
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius_place)
  )
  .attr('fill', function(d) {
    return (color_dark(d.data.key))
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 1)
  .on("mouseover", function(d) {
    place_column = d.data.key + ".0"
    name_column = date_column + "-" + place_column
    update(dataset_board, name_column)
    update_down_left(dataset_board_down_left, place_column.substring(0, place_column.length - 2))
    textInCercle1.text("Distric n°" + place_column)
    textInCercle2.text(date_column)
    d3.selectAll(".circle_categ_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_dark(d.data.key))
    })
    d3.select(this).attr('fill', "#C57063")
    console.log(dataset_board_down_left[0][place_column.substring(0, place_column.length - 2)])
    textBottomCat1.text(dataset_board_down_left[0][place_column.substring(0, place_column.length - 2)])
    textBottomCat2.text(dataset_board_down_left[1][place_column.substring(0, place_column.length - 2)])
    textBottomCat3.text(dataset_board_down_left[2][place_column.substring(0, place_column.length - 2)])
    textBottomCat4.text(dataset_board_down_left[3][place_column.substring(0, place_column.length - 2)])
    textBottomCat5.text(dataset_board_down_left[4][place_column.substring(0, place_column.length - 2)])
  })

svg_board_select
  .selectAll('whatever')
  .data(data_ready_blank)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius_blank_l)
  )
  .attr('fill', function(d) {
    return "#f4f4f4";
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 1)

svg_board_select
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr("class", "circle_date_board")
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d) {
    return (color_light(d.data.key))
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 1)
  .on("mouseover", function(d) {
    date_column = d.data.key
    name_column = date_column + "-" + place_column
    update(dataset_board, name_column)
    textInCercle1.text("Distric n°" + place_column)
    textInCercle2.text(date_column)
    d3.selectAll(".circle_date_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_light(d.data.key))
    })
    d3.select(this).attr('fill', "#C57063")
  })

svg_board_select
  .selectAll('whatever')
  .data(data_ready_blank)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius_blank)
  )
  .attr('fill', function(d) {
    return "#f4f4f4";
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 1)

var textInCercle1 = svg_board_select.append("text")
  .attr("x", 0)
  .attr("y", -60)
  .attr("id", "textInCercle")
  .attr("dy", "2.5em")
  .attr("font-size", "19px")
  .style("text-anchor", "middle")
  .text("");

var textInCercle2 = svg_board_select.append("text")
  .attr("x", 0)
  .attr("y", -40)
  .attr("id", "textInCercle")
  .attr("dy", "2.5em")
  .attr("font-size", "23px")
  .style("text-anchor", "middle")
  .text("");



//========================================================================================

// set the dimensions and margins of the graph
var margin_board_bar_down_left = {
    top: 0,
    right: 0,
    bottom: 0,
    left: -10
  },
  width_board_bar_down_left = window.innerWidth / 1.3 - margin_board_bar_down_left.left - margin_board_bar_down_left.right,
  height_board_bar_down_left = 160 - margin_board_bar_down_left.top - margin_board_bar_down_left.bottom;

// append the svg_board object to the body of the page
var svg_board_bar_down_left = d3.select("#the_board_bar_down_left")
  .append("svg")
  .attr("width", width_board_bar_down_left + margin_board_bar_down_left.left + margin_board_bar_down_left.right)
  .attr("height", height_board_bar_down_left + margin_board_bar_down_left.top + margin_board_bar_down_left.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin_board_bar_down_left.left + "," + margin_board_bar_down_left.top + ")");

// Initialize the X axis
var x_board_bar_down_left = d3.scaleBand()
  .range([0, width_board_bar_down_left])
  .padding(0.1);
var xAxis_board_bar_down_left = svg_board_bar_down_left.append("g")
  .attr("transform", "translate(0," + height_board_bar_down_left + ")")

// Initialize the Y axis
var y_board_bar_down_left = d3.scaleLinear()
  .range([height_board_bar_down_left, 0]);
var yAxis_board_bar_down_left = svg_board_bar_down_left.append("g")
  .attr("class", "myYaxis_bar_down_left")


// A function that create / update the plot for a given variable:
function update_down_left(data, value_nb) {

  // Update the X axis
  x_board_bar_down_left.domain(data.map(function(d) {
    return d.group;
  }))
  //xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y_board_bar_down_left.domain([0, d3.max(data, function(d) {
    return 57;
  })]);
  yAxis_board_bar_down_left.transition().duration(1000).call(d3.axisLeft(y_board_bar_down_left));

  //textBoardBar.text(function(d) {
  //return d.group + " " + d[value_nb];
  //})
  // Create the u variable
  var u_stream_bar_down_left = svg_board_bar_down_left.selectAll("rect")
    .data(data)
    .attr("class", "board_bar_down_left")

  // Draw the axis
  svg_board_bar_down_left
    .append("g")
    .attr("transform", "translate(0,10)") // This controls the vertical position of the Axis
    .call(d3.axisBottom(x_board_bar_down_left));

  u_stream_bar_down_left
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u_stream_bar_down_left) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(400)
    .attr("x", function(d) {
      return x_board_bar_down_left(d.group);
    })
    .attr("y", function(d) {
      return y_board_bar_down_left(d[value_nb]);
    })
    .attr("width", x_board_bar_down_left.bandwidth())
    .attr("height", function(d) {
      //return y(d[2005 + "-" + place_column]);
      //return 70;
      //console.log(d)
      //return 10;
      //console.log(y_board_bar_down_left(d[value_nb]))
      return height_board_bar_down_left - y_board_bar_down_left(d[value_nb]);
    })
    .attr("fill", "#282A2D")


  d3.selectAll("#textBottomCat").remove();
  textBottomCat1 = svg_board_bar_down_left.append("text")
    .attr("x", (width_board_bar_down_left / 5) * 0.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#C57063')
    .style('fill', '#485060')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat2 = svg_board_bar_down_left.append("text")
    .attr("x", (width_board_bar_down_left / 5) * 1.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#C57063')
    .style('fill', '#485060')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat3 = svg_board_bar_down_left.append("text")
    .attr("x", (width_board_bar_down_left / 5) * 2.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#C57063')
    .style('fill', '#485060')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat4 = svg_board_bar_down_left.append("text")
    .attr("x", (width_board_bar_down_left / 5) * 3.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#C57063')
    .style('fill', '#485060')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat5 = svg_board_bar_down_left.append("text")
    .attr("x", (width_board_bar_down_left / 5) * 4.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#C57063')
    .style('fill', '#485060')
    .style("text-anchor", "middle")
    .text("");
  // If less group in the new dataset, I delete the ones not in use anymore
  u_stream_bar_down_left
    .exit()
    .remove()


}