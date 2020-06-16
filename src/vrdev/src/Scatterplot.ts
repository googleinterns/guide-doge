//run tsc Scatterplot.ts to compile into Scatterplot.js file
import * as _d3 from "d3";

declare global {
  const d3: typeof _d3;
}

class Scatterplot{
    data: number[];
    shape: string;

  constructor(){
    this.data = [0, 0];
  }
  init(){
    // create a scale so that there is correspondence between data set and screen render
    this.data = [10,20,30,40,50,60,70,80];
    this.generatePts("a-sphere");  
    this.setColor("blue");
    //console.log("hello");
  }
  generatePts(shape: string){
    this.shape = shape;
    let hscale = d3.scaleLinear();
    hscale.domain([0, d3.max(this.data) as number])       //max of dataset
    .range([0, 10]);                                      //linear mapping of data set values to values from 0 to 10

     //enter identifies any DOM elements to be added when # array elements doesn't match
    let datPt = d3.select("a-scene").selectAll(shape).data(this.data).enter().append(shape);

    //select all shapes within scene 
    //d is data at index, i within 
    d3.selectAll(shape).attr("position", (d, i) => {
      let x = 0;
      let y = i*5;
      let z = -this.data[i];
      return (x + " " + y + " "   + z);
    });
  }
  //generatePts must be called before set color, bc then this.shape is undefined
  setColor(color){
    d3.selectAll(this.shape).attr("color", () => {
      return color;
    })
  }
}


  
