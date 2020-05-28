// set the dimensions and margins of the graph
var margin_stream = {
    top: 15,
    right: 30,
    bottom: 30,
    left: 60
  },
  width_streamgraph = 0.8 * window.innerWidth,
  height_streamgraph = 690 - margin_stream.top - margin_stream.bottom

var months_dict = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

// append the svg object to the body of the page
var svg2 = d3.select('#streamgraph')
  .append('svg')
  .attr('width', width_streamgraph + margin_stream.left + margin_stream.right)
  .attr('height', height_streamgraph + margin_stream.top + margin_stream.bottom)
  .append('g')
  .attr('transform',
    'translate(' + margin_stream.left + ',' + margin_stream.top + ')')

// Parse the Data
d3.csv('data/Crimes_by_day_by_type.csv', function (data) {
  // List of groups = header of the csv files
  var keys = data.columns.slice(1)
  console.log(keys)

  // Add X axis
  var x_stream = d3.scaleLinear()
    .domain(d3.extent(data, function (d) {
      return d.date
    }))
    .range([0, 650])
  //

  svg2.append('g')
    .attr('transform', 'translate(0,' + height_streamgraph + ')')
    .call(d3.axisBottom(x_stream).tickSize(-height_streamgraph * 1).tickValues([1, 230]))
    .select('.domain').remove()

  svg2.selectAll('.tick line').attr('stroke', '#f2f2f2')
  svg2.selectAll('.tick text').attr('opacity', 0)

  // Add X axis label:
  svg2.append('text')
    .attr('text-anchor', 'end')
    .attr('x', width_streamgraph / 2)
    .attr('y', height_streamgraph - 30)
    .style('fill', '#FAFAFA')
    .text('2001-2020')

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-15000, 25000])
    .range([height_streamgraph / 4, height_streamgraph])

  // color palette
  var color_streamgraph = d3.scaleOrdinal()
    .domain(keys)
    .range(['#B6F5F6', '#45A4B8', '#06547A', '#3E8B7E', '#6EDDA2'])

  // stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)(data)

  // create a tooltip
  var Tooltip = svg2
    .append('text')
    .attr('x', 100)
    .attr('y', 0)
    .style('opacity', 0)
    .style('fill', '#FAFAFA')
    .style('font-size', 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function (d) {
    Tooltip.style('opacity', 1)
    d3.selectAll('.area_streamgraph').style('opacity', 0.2)
    d3.select(this)
      .style('stroke', 'white')
      .style('opacity', 1)
      .style('fill', '#69779B')

  }
  var mousemove = function (d, i) {
    mouse_pos = d3.mouse(this)
    x_pos = Math.round(mouse_pos[0] / (width_streamgraph / d.length))
    y_val = Math.abs(d[x_pos][1] - d[x_pos][0])
    grp = keys[i]

    month = x_pos % 12
    year = Math.floor(x_pos/12)

    month_str = months_dict[month]
    year_str = year + 2001

    console.log(month_str)



    str = y_val.toString() + " " + grp.toString() + " recorded during the month " + month_str + " " + year_str
    Tooltip.text(str)
  }
  var mouseleave = function (d) {
    Tooltip.style('opacity', 0)
    d3.selectAll('.area_streamgraph').style('opacity', 0.5).style('stroke', 'none').style('fill', function (d) {
      return color_streamgraph(d.key)
    })
  }

  // Area generator
  var area = d3.area()
    .x(function (d) {
      return x_stream(d.data.date)
    })
    .y0(function (d) {
      return y(d[0])
    })
    .y1(function (d) {
      return y(d[1])
    })
  // Show the areas
  svg2
    .selectAll('mylayers')
    .data(stackedData)
    .enter()
    .append('path')
    .attr('class', 'area_streamgraph')
    .style('fill', function (d) {
      return color_streamgraph(d.key)
    })
    .style('opacity', 0.5)
    .attr('d', area)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
})
