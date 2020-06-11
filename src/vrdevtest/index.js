class Scatter{
  constructor(){
    this.x = 2;
    this.y = 2;
    this.z = 2;
  }
  init(){
    var data = [ 10, 20, 30, 40,50,60,70,80];

    // create a scale so that there is correspondence between data set and screen render
    var pt = new dataPt("a-sphere", data);
    pt.generatePts();  
  }
}

class dataPt{
   constructor(shape, data){
     this.shape = shape;
     this.data = data;
     this.scene = d3.select("a-scene");
     this.ptUpdate = scene.selectAll(this.shape).data(this.data);
   }
  generatePts(){
     var hscale = d3.scaleLinear();
     hscale.domain([0, d3.max(this.data)])                            //max of dataset
     .range([0, 10]);                                                 //linear mapping of data set from 0 to 10

     //enter identifies any DOM elements to be added when # array elements doesn't match
    var dataPt = this.scene.selectAll(this.shape).data(this.data)
    dataPt.enter().append(this.shape);
     
    this.ptUpdate.attr("position" = (d,i) => {
      var x = 0;
      var y = i*5;
      var z = -d/10;
      return (x + " " + y + " " + z);
    });  
  }
}
  
