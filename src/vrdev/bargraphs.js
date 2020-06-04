function myFunction(){
// fake data
var data = [ 10, 20, 30, 15, 25, 35, 40,
            45, 50, 70, 100, 120, 130,
           12, 18, 22, 29, 33, 44, 59, 200]

// we scale the height of our bars using d3's linear scale
var hscale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 3])

// we select the scene object just like an svg
var scene = d3.select("a-scene")

// we use d3's enter/update/exit pattern to draw and bind our dom elements
var bars = scene.selectAll("a-cube.bar").data(data)
bars.enter().append("a-cube").classed("bar", true)
// we set attributes on our cubes to determine how they are rendered
bars.attr({
  position: function(d,i) {
    // cubes are positioned by their center so we
    // offset for their height
    var y = 1 + hscale(d)/2;
    // lets place the bars all around our camera
    var radius = 5;
    //var x = i - data.length/2;
    var x = radius * Math.cos(i/data.length * 2 * Math.PI)
    var z = radius * Math.sin(i/data.length * 2 * Math.PI)
    return x + " " + y + " " + z
  },
  rotation: function(d,i) {
    var x = 0;
    var z = 0;
    var y = -(i/data.length)*360;
    return x + " " + y + " " + z
  },
  width: function(d) { return 0.5},
  depth: function(d) { return 0.9},
  height: function(d) { return hscale(d)},
  opacity: function(d,i) { return 0.6 + (i/data.length) * 0.4},
  //metalness: function(d,i) { return i/data.length}
})
.on("click", function(d,i) {
  console.log("click", i,d)
})
.on("mouseenter", function(d,i) {
  // this event gets fired continuously as long as the cursor
  // is over the element. we only want trigger our animation the first time
  if(this.hovering) return;
  console.log("hover", i,d)
  this.hovering = true;
  d3.select(this).transition().duration(1000)
  .attr({
    metalness: 0.5,
    width: 2
  })
})
.on("mouseleave", function(d,i) {
  console.log("leave",i,d)
  this.hovering = false;
  d3.select(this).transition()
  .attr({
    metalness: 0,
    width: 0.5
  })
})    }