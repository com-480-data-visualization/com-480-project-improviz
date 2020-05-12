// create 2 data_set
var data1 = [{
    group: "A",
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
  {
    group: "D",
    value: 10
  }
];

// set the dimensions and margins of the graph
var margin = {
    top: 0,
    right: 30,
    bottom: 70,
    left: 60
  },
  width_board = 460 - margin.left - margin.right,
  height_board = 400 - margin.top - margin.bottom;

// append the svg_board object to the body of the page
var svg_board = d3.select("#the_board")
  .append("svg")
  .attr("width", width_board + margin.left + margin.right)
  .attr("height", height_board + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([0, width_board])
  .padding(0);
var xAxis = svg_board.append("g")
  .attr("transform", "translate(0," + height_board + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([0, height_board]);
var yAxis = svg_board.append("g")
  .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(data) {

  // Update the X axis
  x.domain(data.map(function(d) {
    return d.group;
  }))
  //xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) {
    return d.value
  })]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u_stream = svg_board.selectAll("rect")
    .data(data)

  u_stream
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u_stream) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", function(d) {
      return x(d.group);
    })
    .attr("y", function(d) {
      return 0;
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      return y(d.value);
    })
    .attr("fill", "#282A2D")

  // If less group in the new dataset, I delete the ones not in use anymore
  u_stream
    .exit()
    .remove()
}

// Initialize the plot with the first dataset
update(data1)