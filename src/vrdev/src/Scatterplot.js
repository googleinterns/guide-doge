"use strict";
exports.__esModule = true;
var Scatterplot = /** @class */ (function () {
    function Scatterplot() {
        this.data = [0, 0];
    }
    Scatterplot.prototype.init = function () {
        // create a scale so that there is correspondence between data set and screen render
        this.data = [10, 20, 30, 40, 50, 60, 70, 80];
        this.generatePts("a-sphere");
        this.setColor("blue");
        //console.log("hello");
    };
    Scatterplot.prototype.generatePts = function (shape) {
        var _this = this;
        this.shape = shape;
        var hscale = d3.scaleLinear();
        hscale.domain([0, d3.max(this.data)]) //max of dataset
            .range([0, 10]); //linear mapping of data set values to values from 0 to 10
        //enter identifies any DOM elements to be added when # array elements doesn't match
        var datPt = d3.select("a-scene").selectAll(shape).data(this.data).enter().append(shape);
        //select all shapes within scene 
        //d is data at index, i within 
        d3.selectAll(shape).attr("position", function (d, i) {
            var x = 0;
            var y = i * 5;
            var z = -_this.data[i];
            return (x + " " + y + " " + z);
        });
    };
    //generatePts must be called before set color, bc then this.shape is undefined
    Scatterplot.prototype.setColor = function (color) {
        d3.selectAll(this.shape).attr("color", function () {
            return color;
        });
    };
    return Scatterplot;
}());
