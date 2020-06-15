"use strict";
exports.__esModule = true;

var Scatter = /** @class */ (function () {
    function Scatter() {
        this.x = 2;
        this.y = 2;
        this.z = 2;
    }
    Scatter.prototype.init = function () {
        var data = [10, 20, 30, 40, 50, 60, 70, 80];
        // create a scale so that there is correspondence between data set and screen render
        var pts = new dataPt("a-sphere", data);
        pts.generatePts();
        pts.setColor("blue");
        //console.log("hello");
    };
    return Scatter;
}());
var dataPt = /** @class */ (function () {
    function dataPt(shape, data) {
        this.shape = shape;
        this.data = data;
    }
    dataPt.prototype.generatePts = function () {
        var _this = this;
        var hscale = d3.scaleLinear();
        hscale.domain([0, d3.max(this.data)]) //max of dataset
            .range([0, 10]); //linear mapping of data set values to values from 0 to 10
        //enter identifies any DOM elements to be added when # array elements doesn't match
        var datPt = d3.select("a-scene").selectAll(this.shape).data(this.data).enter().append(this.shape);
        //select all shapes within scene 
        //d is data at index, i within 
        d3.selectAll(this.shape).attr("position", function (d, i) {
            var x = 0;
            var y = i * 5;
            var z = -_this.data[i];
            return (x + " " + y + " " + z);
        });
    };
    dataPt.prototype.setColor = function (color) {
        d3.selectAll(this.shape).attr("color", function () {
            return color;
        });
    };
    return dataPt;
}());
