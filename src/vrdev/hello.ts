import * as _d3 from "d3";

declare global {
  const d3: typeof _d3;
}

class Scatter{
    x: number;
    y: number;
    z: number;

  constructor(){
    this.x = 2;
    this.y = 2;
    this.z = 2;
    
  }
  init(){
    let data: number[] = [ 10, 20, 30, 40,50,60,70,80];

    // create a scale so that there is correspondence between data set and screen render
    var pts = new dataPt("a-sphere", data);
    pts.generatePts();  
    pts.setColor("blue");
    //console.log("hello");
  }
}

class dataPt{
    shape: string;
    data: number[];

   constructor(shape: string, data: number[]){
     this.shape = shape;
     this.data = data;
   }
  generatePts(){
   
     var hscale = d3.scaleLinear();
     hscale.domain([0, d3.max(this.data) as number])       //max of dataset
     .range([0, 10]);                            //linear mapping of data set values to values from 0 to 10

     //enter identifies any DOM elements to be added when # array elements doesn't match
    var datPt = d3.select("a-scene").selectAll(this.shape).data(this.data).enter().append(this.shape);

    //select all shapes within scene 
    //d is data at index, i within 
    d3.selectAll(this.shape).attr("position", (d, i) => {
      var x = 0;
      var y = i*5;
      var z = -this.data[i];
      return (x + " " + y + " "   + z);
    });
  }
  setColor(color){
    d3.selectAll(this.shape).attr("color", () => {
      return color;
    })
  }
}
  
