function main(){
    var data = [ 10, 20, 30,40,50,60,70,80]

// we scale the height of our bars using d3's linear scale
var hscale = d3.scale.linear()
.domain([0, d3.max(data)])
.range([0, 3])

// we select the scene object just like an svg
var scene = d3.select("a-scene")

// we use d3's enter/update/exit pattern to draw and bind our dom elements
var dataPt = scene.selectAll("a-sphere.dataPt").data(data)
dataPt.enter().append("a-sphere").classed("dataPt", true)
// we set attributes on our cubes to determine how they are rendered
dataPt.attr({
position: function(d,i) {

var x = 0;
var y = i*5;
var z = -d/10;
return x + " " + y + " " + z
},
// radius: function(d) { return hscale(d/5)},
radius: function(){return 1},
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
})   
}

function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}