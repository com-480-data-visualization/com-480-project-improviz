// set the dimensions and margins of the graph
var margin_stream = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 60
  },
  width_streamgraph = 0.8 * window.innerWidth,
  height_streamgraph = 690 - margin_stream.top - margin_stream.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#streamgraph")
  .append("svg")
  .attr("width", width_streamgraph + margin_stream.left + margin_stream.right)
  .attr("height", height_streamgraph + margin_stream.top + margin_stream.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin_stream.left + "," + margin_stream.top + ")");




// Parse the Data
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv", function(data) {
d3.csv("data/Crimes_by_day_by_type.csv", function(data) {

  // List of groups = header of the csv files
  var keys = data.columns.slice(1)

  // Add X axis
  var x_stream = d3.scaleLinear()
    .domain(d3.extent(data, function(d) {
      return d.date;
    }))
    .range([0, 650]);
  svg2.append("g")
    .attr("transform", "translate(0," + height_streamgraph + ")")
    .call(d3.axisBottom(x_stream).tickSize(-height_streamgraph * 1).tickValues([1, 230]))
    .select(".domain").remove()

  svg2.selectAll(".tick line").attr("stroke", "#f2f2f2")

  // Add X axis label:
  svg2.append("text")
    .attr("text-anchor", "end")
    .attr("x", width_streamgraph / 2)
    .attr("y", height_streamgraph - 30)
    .style('fill', '#FAFAFA')
    .text("2001-2020");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-15000, 25000])
    .range([height_streamgraph / 4, height_streamgraph]);

  // color palette
  var color_streamgraph = d3.scaleOrdinal()
    .domain(keys)
    .range(['#FAFAFA', '#E7E7E9', '#D4D5D9', '#BEBFC5', '#A3A5AD', '#888A95', '#71737F', '#565861'])

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)

  // create a tooltip
  var Tooltip = svg2
    .append("text")
    .attr("x", 100)
    .attr("y", 0)
    .style("opacity", 0)
    .style('fill', '#FAFAFA')
    .style("font-size", 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".area_streamgraph").style("opacity", .2)
    d3.select(this)
      .style("stroke", "white")
      .style("opacity", 1)
      .style('fill', '#C57063')
  }
  var mousemove = function(d, i) {
    grp = keys[i]
    Tooltip.text(grp)
  }
  var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".area_streamgraph").style("opacity", 1).style("stroke", "none").style("fill", function(d) {
      return color_streamgraph(d.key);
    })
  }

  // Area generator
  var area = d3.area()
    .x(function(d) {
      return x_stream(d.data.date);
    })
    .y0(function(d) {
      return y(d[0]);
    })
    .y1(function(d) {
      return y(d[1]);
    })
  // Show the areas
  svg2
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", "area_streamgraph")
    .style("fill", function(d) {
      return color_streamgraph(d.key);
    })
    .attr("d", area)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

})