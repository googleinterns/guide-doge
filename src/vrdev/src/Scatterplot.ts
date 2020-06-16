//run tsc Scatterplot.ts to compile into Scatterplot.js file

// for running on browser
// import * as _d3 from "d3";

// declare global {
//   const d3: typeof _d3;
// }

//for unit testing
import * as d3 from "d3";


export class Scatterplot{
    data: number[];
    shape: string;

  constructor(){
    this.data = [0, 0];
  }
  init(data: number[]){
    // create a scale so that there is correspondence between data set and screen render
    this.data = data;
    
    this.generatePts("a-sphere");  
    this.setColor("blue");
    //console.log("hello");
    return this.data;
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
      let x = hscale(i*5);
      let y = hscale(i*10);
      let z = hscale(-this.data[i]*10);
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


  
