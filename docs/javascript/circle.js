// set the dimensions and margins of the graph
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  },
  width = 560,
  height = 560,
  innerRadius = 240,
  outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")"); // Add 100 on Y translation, cause upper bars are longer

d3.csv("data/Crimes_by_dayofyear.csv", function(data) {

  var textNbCrimes = svg.append("text")
    .attr("x", 0)
    .attr("y", -80)
    .attr("id", "test2")
    .attr("dy", "2.5em")
    .attr("font-size", "30px")
    .style("text-anchor", "middle")
    .text("");

  var textElements = svg.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dy", "1.5em")
    .attr("font-size", "15px")
    .style("text-anchor", "middle")
    .text("crimes one day of the year from 2001 to now");

  // X scale
  var x = d3.scaleBand()
    .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0) // This does nothing ?
    .domain(data.map(function(d) {
      return d.Date;
    })); // The domain of the X axis is the list of states.

  // Y scale
  var y = d3.scaleRadial()
    .range([innerRadius, outerRadius]) // Domain will be define later.
    .domain([0, 20000]); // Domain of Y is from 0 to the max seen in the data

  // Second barplot Scales
  var ybis = d3.scaleRadial()
    .range([innerRadius, 200]) // Domain will be defined later.
    .domain([0, 20000]);

  // Add bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", "#14161A")
    .on("mouseover", function(d) {
      //d3.selectAll("path").transition().duration(0);
      d3.selectAll("*").transition("movement")
      d3.selectAll("#BarCercle").attr("fill", "#14161A");
      d3.selectAll("#BarCercle2").attr("fill", "#14161A");
      d3.select(this).attr("fill", "#939CAE");
      suffix = 'th';
      if (d.Date < 2) {
        suffix = 'st';
      } else if (d.Date < 3) {
        suffix = 'nd';
      } else if (d.Date < 4) {
        suffix = 'rd';
      }
      return textNbCrimes.text(d.Crimes), textElements.text("crimes the " + d.Date + suffix + " day of the year from 2001 to now");
    })
    .on("mouseout", function(d) {
      //e.attr("log", 0);
      /*
      d3.transition().duration(500)
        .delay(function(d) {
          return x(d.Date) * 20000;
        })
        //.attr("fill", "#444B5B")
        .transition()
        .duration(5000)
        .delay(function(d) {
          return 2000;
        })*/
      //.attr("fill", "#14161A")
    })
    .attr("id", "BarCercle")
    .attr("d", d3.arc() // imagine your doing a part of a donut plot
      //.attr("id", "BarCercle")
      .innerRadius(innerRadius)
      .outerRadius(function(d) {
        return y(d['Crimes'] - 10000);
      })
      .startAngle(function(d) {
        return x(d.Date);
      })
      .endAngle(function(d) {
        return x(d.Date) + x.bandwidth();
      })
      .padAngle(0.00)
      .padRadius(innerRadius))
    .transition("movement")
    .duration(500)
    .delay(function(d) {
      return x(d.Date) * 20000;
    })
    .attr("fill", "#444B5B")
    .on('start', function(d) {
      var suffix = 'th';
      if (d.Date < 2) {
        suffix = 'st';
      } else if (d.Date < 3) {
        suffix = 'nd';
      } else if (d.Date < 4) {
        suffix = 'rd';
      }
      textNbCrimes.text(d.Crimes), textElements.text("crimes the " + d.Date + suffix + " day of the year from 2001 to now");
    })
    .transition()
    .duration(5000)
    .delay(function(d) {
      return 2000;
    })
    .attr("fill", "#14161A")

  // Add the second series
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", "#14161A")
    /*    .on("mouseover", function(d) {
          d3.selectAll("path").transition().duration(0);
          return textNbCrimes.text(d.Crimes), textElements.text("crimes the " + d.Date + " day of the year from 2001 to now"), d3.selectAll("*").transition("movement2").duration(500);;
        })*/
    /*    .on("mouseout", function(d) {
    	    //e.attr("log", 0);
    	    d3.transition().duration(500)
        .delay(function(d) {
          return x(d.Date) * 20000;
        })
        .attr("fill", "#444B5B")
        .transition()
        .duration(5000)
        .delay(function(d) {
          return 2000;
        })
        .attr("fill", "#14161A")
        })*/
    .attr("id", "BarCercle2")
    .attr("d", d3.arc() // imagine your doing a part of a donut plot
      .innerRadius(function(d) {
        return ybis(0)
      })
      .outerRadius(function(d) {
        return ybis(d['Crimes'] - 10000);
      })
      .startAngle(function(d) {
        return x(d.Date);
      })
      .endAngle(function(d) {
        return x(d.Date) + x.bandwidth();
      })
      .padAngle(0.00)
      .padRadius(innerRadius))
    .transition("movement")
    .duration(500)
    .delay(function(d) {
      return x(d.Date) * 20000;
    })
    .attr("fill", "#444B5B")
    .transition()
    .duration(5000)
    .delay(function(d) {
      return 2000;
    })
    .attr("fill", "#14161A")

});