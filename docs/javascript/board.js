// set the dimensions and margins of the graph at the top
var margin = {
    top: 0,
    right: 0,
    bottom: 40,
    left: -10
  },
  width_board = window.innerWidth - margin.left - margin.right - 20,
  height_board = window.innerHeight * 0.27 - margin.top - margin.bottom;

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
  .attr("y", window.innerHeight * 0.27 - 40)
  .attr("id", "textBoardBar")
  .attr("dy", "2.5em")
  .attr("font-size", "15px")
  .attr("color", "#F5F5F5")
  .style("text-anchor", "middle")
  .text("");

var dataset_board;
d3.csv("data/Crimes_board.csv", function(error, datapt) {
  // If error is not null, something went wrong.
  if (error) {
    console.log(error); //Log the error.
  } else {
    dataset_board = datapt; // Give the data a global scope
    //Call some other functions that generate the visualization
  }
});

//variables keeping the categorie we want to observe
var savedDataCateg;
var savedThisCateg;

// A function that create / update the plot for a given variable:
function update(data, value_nb) {

  // Update the X axis
  x.domain(data.map(function(d) {
    return d.group;
  }))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) {
    if (savedDataCateg != null) {
      textBoardBar.text(savedDataCateg.group + " " + savedDataCateg[value_nb].substring(0, savedDataCateg[value_nb].length - 2))
    }

    //the maximum is between those years
    return Math.max(parseInt(d[2002 + "-" + place_column]),
      parseInt(d[2003 + "-" + place_column]),
      parseInt(d[2004 + "-" + place_column]),
      parseInt(d[2005 + "-" + place_column]),
      parseInt(d[2006 + "-" + place_column]),
      parseInt(d[2007 + "-" + place_column]),
      parseInt(d[2008 + "-" + place_column]),
      parseInt(d[2009 + "-" + place_column]))
  })]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u_stream = svg_board.selectAll("rect")
    .data(data)
    .attr("class", "bar_board")
    //change text below bar visualization and color
    .on("mouseover", function(d) {
      savedDataCateg = d
      savedThisCateg = this
      //      place_column.substring(0, place_column.length - 2)
      d[value_nb]
      textBoardBar.text(d.group + " " + d[value_nb].substring(0, d[value_nb].length - 2))
      d3.selectAll(".bar_board").attr("fill", "#282A2D")
      d3.select(this).attr('fill', "#69779B")
    })

  u_stream
    .enter()
    .append("rect")
    .merge(u_stream)
    .transition()
    .duration(400)
    .attr("x", function(d) {
      return x(d.group);
    })
    .attr("y", function(d) {
      return 0;
    })
    .attr("width", x.bandwidth())
    .attr("fill", "#282A2D")
    .attr("height", function(d) {
      d3.select(savedThisCateg).attr('fill', "#69779B")
      return y(d[value_nb]);
    })

  d3.select(savedThisCateg).attr('fill', "#69779B")
}

//==========================================================================
//                    Select data
//==========================================================================

var width = window.innerHeight * 0.54
var height = window.innerHeight * 0.54
var margin = 25

// The radius of the pieplot is half the width or half the height
var radius_place = Math.min(width, height) / 2 - margin
var radius_blank_l = Math.min(width - 80, height - 80) / 2 - margin
var radius = Math.min(width - 100, height - 100) / 2 - margin
var radius_blank = Math.min(width - 180, height - 180) / 2 - margin

// append the svg object to the div
var svg_board_select = d3.select("#the_board_select")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// dataset
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
var dataset_board_down;
var dataset_district_name;

d3.csv("data/Socio_board_left.csv", function(error, datapt) {
  // If error is not null, something went wrong.
  if (error) {
    console.log(error);
  } else {
    dataset_board_down = datapt;
  }
});

d3.csv("data/district_name.csv", function(error, datapt) {
  // If error is not null, something went wrong.
  if (error) {
    console.log(error);
  } else {
    dataset_district_name = datapt;
  }
});

// set the color scale
var color_dark = d3.scaleOrdinal()
  .domain(data)
  .range(["#292E37", '#21242C', '#14161A', '#21242C'])

var color_light = d3.scaleOrdinal()
  .domain(data)
  .range(["#DBDBDB", '#CFCFCF', '#C7C7C7', '#CFCFCF'])


// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {
    return 1;
  })

var data_ready = pie(d3.entries(data))
var data_ready_place = pie(d3.entries(data_place))
var data_ready_blank = pie(d3.entries(data_blank))

// Define values for text
var date_column = "2002";
var place_column = "1.0";
var name_column;

//saved data
var saved_d_circle_categ_board;
var saved_this_circle_categ_board;
var saved_d_circle_date_board;
var saved_this_circle_date_board;

var textBottomCat1;
var textBottomCat2;
var textBottomCat3;
var textBottomCat4;
var textBottomCat5;

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
  .on("click", function(d) {
    //change variable of all texts
    saved_d_circle_categ_board = d
    saved_this_circle_categ_board = this
    place_column = d.data.key + ".0"
    name_column = date_column + "-" + place_column
    textInCercle1.text("Area: " + dataset_district_name[place_column.substring(0, place_column.length - 2) - 1]["COMMUNITY AREA NAME"])
    textInCercle2.text(date_column)

    //update data visu up and down
    update(dataset_board, name_column)
    update_down(dataset_board_down, place_column.substring(0, place_column.length - 2))

    d3.selectAll(".circle_categ_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_dark(d.data.key))
    })
    d3.select(this).attr('fill', "#69779B")

    //update texts
    textBottomCat1.text(dataset_board_down[0][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat2.text(dataset_board_down[1][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat3.text(dataset_board_down[2][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat4.text(dataset_board_down[3][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat5.text(dataset_board_down[4][place_column.substring(0, place_column.length - 2)] + "%")
  })
  .on("mouseover", function(d) {
    //change variable of all texts
    place_column = d.data.key + ".0"
    name_column = date_column + "-" + place_column
    textInCercle1.text("Area: " + dataset_district_name[place_column.substring(0, place_column.length - 2) - 1]["COMMUNITY AREA NAME"])
    textInCercle2.text(date_column)

    //update data visu up and down
    update(dataset_board, name_column)
    update_down(dataset_board_down, place_column.substring(0, place_column.length - 2))

    d3.selectAll(".circle_categ_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_dark(d.data.key))
    })
    d3.select(this).attr('fill', "#69779B")

    //update texts
    textBottomCat1.text(dataset_board_down[0][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat2.text(dataset_board_down[1][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat3.text(dataset_board_down[2][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat4.text(dataset_board_down[3][place_column.substring(0, place_column.length - 2)] + "%")
    textBottomCat5.text(dataset_board_down[4][place_column.substring(0, place_column.length - 2)] + "%")
  })
  .on("mouseleave", function(d) {
    d3.selectAll(".circle_categ_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_dark(d.data.key))
    })
    if (saved_d_circle_categ_board != null) {
      //change variable of all texts
      place_column = saved_d_circle_categ_board.data.key + ".0"
      name_column = date_column + "-" + place_column
      textInCercle1.text("Area: " + dataset_district_name[place_column.substring(0, place_column.length - 2) - 1]["COMMUNITY AREA NAME"])
      textInCercle2.text(date_column)

      //update data visu up and down
      update(dataset_board, name_column)
      update_down(dataset_board_down, place_column.substring(0, place_column.length - 2))

      d3.select(saved_this_circle_categ_board).attr('fill', "#69779B")

      //update texts
      textBottomCat1.text(dataset_board_down[0][place_column.substring(0, place_column.length - 2)] + "%")
      textBottomCat2.text(dataset_board_down[1][place_column.substring(0, place_column.length - 2)] + "%")
      textBottomCat3.text(dataset_board_down[2][place_column.substring(0, place_column.length - 2)] + "%")
      textBottomCat4.text(dataset_board_down[3][place_column.substring(0, place_column.length - 2)] + "%")
      textBottomCat5.text(dataset_board_down[4][place_column.substring(0, place_column.length - 2)] + "%")
    } else {
      d3.select(this).attr('fill', "#69779B")
    }
  })

//add numbers in cercle
svg_board_select
  .selectAll('whatever')
  .data(data_ready_place)
  .enter()
  .append('text')
  .text(function(d) {
    if (d.data.key % 10 == 0) {
      return d.data.key;
    } else {
      return "";
    }

  })
  .attr("transform", function(d) {
    return "translate(" + d3.arc()
      .innerRadius(0)
      .outerRadius(radius_place * 2 - 35).centroid(d) + ")";
  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
  .attr("fill", "white")

//add blank between two circles
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
  .on("click", function(d) {
    //change variable of all texts
    saved_d_circle_date_board = d
    saved_this_circle_date_board = this
    date_column = d.data.key
    name_column = date_column + "-" + place_column
    textInCercle2.text(date_column)

    //update data visu up
    update(dataset_board, name_column)
    d3.selectAll(".circle_date_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_light(d.data.key))
    })
    d3.select(this).attr('fill', "#69779B")
  })
  .on("mouseover", function(d) {
    //change variable of all texts
    date_column = d.data.key
    name_column = date_column + "-" + place_column
    textInCercle2.text(date_column)

    //update data visu up
    update(dataset_board, name_column)
    d3.selectAll(".circle_date_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_light(d.data.key))
    })
    d3.select(this).attr('fill', "#69779B")
  })
  .on("mouseleave", function(d) {

    d3.selectAll(".circle_date_board").style("stroke-width", "2px").attr("stroke", "black").attr('fill', function(d) {
      return (color_light(d.data.key))
    })

    if (saved_d_circle_date_board != null) {
      //change variable of all texts
      date_column = saved_d_circle_date_board.data.key
      name_column = date_column + "-" + place_column
      textInCercle2.text(date_column)

      //update data visu up
      update(dataset_board, name_column)
      d3.select(saved_this_circle_date_board).attr('fill', "#69779B")
    } else {
      d3.select(this).attr('fill', "#69779B")
    }
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
var margin_board_bar_down = {
    top: 0,
    right: 0,
    bottom: 0,
    left: -10
  },
  width_board_bar_down = window.innerWidth / 1.3 - margin_board_bar_down.left - margin_board_bar_down.right,
  height_board_bar_down = window.innerHeight * 0.17 - margin_board_bar_down.top - margin_board_bar_down.bottom;

// Define height
d3.select("#the_board_bar_down").style("height", (window.innerHeight * 0.17 - 1) + "px")

// append the svg_board object
var svg_board_bar_down = d3.select("#the_board_bar_down")
  .append("svg")
  .attr("width", width_board_bar_down + margin_board_bar_down.left + margin_board_bar_down.right)
  .attr("height", height_board_bar_down + margin_board_bar_down.top + margin_board_bar_down.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin_board_bar_down.left + "," + margin_board_bar_down.top + ")");

// Initialize the X axis
var x_board_bar_down = d3.scaleBand()
  .range([0, width_board_bar_down])
  .padding(0.1);
var xAxis_board_bar_down = svg_board_bar_down.append("g")
  .attr("transform", "translate(0," + height_board_bar_down + ")")

// Initialize the Y axis
var y_board_bar_down = d3.scaleLinear()
  .range([height_board_bar_down, 0]);
var yAxis_board_bar_down = svg_board_bar_down.append("g")
  .attr("class", "myYaxis_bar_down")


// update the plot for a given category
function update_down(data, value_nb) {

  // Update the X axis
  x_board_bar_down.domain(data.map(function(d) {
    return d.group;
  }))

  // Update the Y axis
  y_board_bar_down.domain([0, d3.max(data, function(d) {
    return 57; //the max value
  })]);
  yAxis_board_bar_down.transition().duration(1000).call(d3.axisLeft(y_board_bar_down));

  // Create the u variable
  var u_stream_bar_down = svg_board_bar_down.selectAll("rect")
    .data(data)
    .attr("class", "board_bar_down")

  // Draw the axis
  svg_board_bar_down
    .append("g")
    .attr("transform", "translate(0,10)")
    .call(d3.axisBottom(x_board_bar_down));

  u_stream_bar_down
    .enter()
    .append("rect")
    .merge(u_stream_bar_down)
    .transition()
    .duration(400)
    .attr("x", function(d) {
      return x_board_bar_down(d.group);
    })
    .attr("y", function(d) {
      return y_board_bar_down(d[value_nb]);
    })
    .attr("width", x_board_bar_down.bandwidth())
    .attr("height", function(d) {
      return height_board_bar_down - y_board_bar_down(d[value_nb]);
    })
    .attr("fill", "#282A2D")

  d3.selectAll("#textBottomCat").remove(); //remove old texts
  textBottomCat1 = svg_board_bar_down.append("text")
    .attr("x", (width_board_bar_down / 5) * 0.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#69779B')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat2 = svg_board_bar_down.append("text")
    .attr("x", (width_board_bar_down / 5) * 1.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#69779B')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat3 = svg_board_bar_down.append("text")
    .attr("x", (width_board_bar_down / 5) * 2.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#69779B')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat4 = svg_board_bar_down.append("text")
    .attr("x", (width_board_bar_down / 5) * 3.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#69779B')
    .style("text-anchor", "middle")
    .text("");

  textBottomCat5 = svg_board_bar_down.append("text")
    .attr("x", (width_board_bar_down / 5) * 4.5)
    .attr("y", 10)
    .attr("dy", "2.5em")
    .attr("id", "textBottomCat")
    .attr("font-size", "18px")
    .style('fill', '#69779B')
    .style("text-anchor", "middle")
    .text("");

}