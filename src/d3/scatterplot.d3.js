"use strict";
// run `tsc Scatterplot.ts` to compile into Scatterplot.js file
exports.__esModule = true;
exports.Scatterplot = void 0;
// for running on browser
// import * as _d3 from 'd3';
// declare global {
// const d3: typeof _d3;
// }
// for unit testing
var d3 = require("d3");
var Scatterplot = /** @class */ (function () {
    function Scatterplot(shape) {
        this.shape = shape;
    }
    Scatterplot.prototype.init = function (container, data) {
        this.data = data;
        this.container = container;
        this.generatePts();
        this.setColor('blue');
    };
    Scatterplot.prototype.generatePts = function () {
        var _this = this;
        // create a scale so that there is correspondence between data set and screen render
        var hscale = d3.scaleLinear();
        hscale.domain([0, d3.max(this.data)]) // max of dataset
            .range([0, 10]); // linear mapping of data set values to values from 0 to 10
        // enter identifies any DOM elements to be added when # array elements doesn't match
        d3.select(this.container).selectAll(this.shape).data(this.data).enter().append(this.shape);
        // d is data at index, i within
        // select all shapes within given container
        d3.select(this.container).selectAll(this.shape).attr('position', function (d, i) {
            var x = i * 5;
            var y = i * 10;
            var z = -_this.data[i] * 2;
            return x + " " + y + " " + z;
        });
    };
    Scatterplot.prototype.setColor = function (color) {
        d3.select(this.container).selectAll(this.shape).attr('color', function () {
            return color;
        });
    };
    return Scatterplot;
}());
exports.Scatterplot = Scatterplot;
