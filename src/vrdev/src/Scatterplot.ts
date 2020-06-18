//run tsc Scatterplot.ts to compile into Scatterplot.js file

// for running on browser
import * as _d3 from "d3";

declare global {
  const d3: typeof _d3;
}

//for unit testing
// import * as d3 from "d3";


export class Scatterplot{
    data: number[];
    shape: string;
    container: HTMLElement;

  constructor(){
    this.data = [0];
  }
  init(container: HTMLElement, data: number[]){
    this.data = data;
    this.container = container;
    return this.data;
  }
  generatePts(shape: string): string[]{
    this.shape = shape;
    // create a scale so that there is correspondence between data set and screen render
    let hscale = d3.scaleLinear();
    hscale.domain([0, d3.max(this.data) as number])       //max of dataset
    .range([0, 10]);                                      //linear mapping of data set values to values from 0 to 10

     //enter identifies any DOM elements to be added when # array elements doesn't match
   d3.select(this.container).selectAll(shape).data(this.data).enter().append(shape);

    //select all shapes within scene 
    //d is data at index, i within 
    let posArray: string[] = ["entry"];
    posArray.pop();
    d3.select(this.container).selectAll(shape).attr("position", (d, i) => {
      let x = i*5;
      let y = i*10;
      let z = -this.data[i]*2;
      posArray.push(x + " " + y + " "   + z);
      return (x + " " + y + " "   + z);
    });

    return posArray;
  }
  //generatePts must be called before set color, bc then this.shape is undefined
  setColor(color){
    d3.selectAll(this.shape).attr("color", () => {
      return color;
    })
  }
}


  
