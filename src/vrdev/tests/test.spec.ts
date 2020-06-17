// import { Scatterplot } from '../src/Scatterplot';

//   describe('creates a scatterplot object', function() {
//     it('assigns 2 element 0 array to scatterplot object', function() {
//       let scatterplot = new Scatterplot();
//       let result = scatterplot.data;
//       //constructor initializes data to [0, 0]
//       expect(result).toEqual([0, 0]);
//     });
//   });

//   //can't send null or undefined bc scatterplot.init only accepts number[]
//   //write error handling for .init???
//   describe('initializes accompanying data for scatterplot', function() {
//     it('sends short array', function() {
//       let scatterplot = new Scatterplot();
//       let result = scatterplot.init([0, 10, 20]);
//       expect(result).toEqual([0, 10, 20]);
//     });
//     it('sends longer array', function() {
//       let scatterplot = new Scatterplot();
//       let result = scatterplot.init([0, 10, 20, 30, 40, 50, 60]);
//       expect(result).toEqual([0, 10, 20, 30, 40, 50, 60]);
//     });
//     it('sends one element array', function() {
//       let scatterplot = new Scatterplot();
//       let result = scatterplot.init([1]);
//       expect(result).toEqual([1]);
//     });
//     it('sends empty array', function() {  
//       let scatterplot = new Scatterplot();
//       let result = scatterplot.init([]);
//       expect(result).toEqual([]);
//     });
//   });

//   describe('places scatter points on plot', function() {
//    //it function below results in failed test since document is never initialized with unit testing (document is null)
//     it('places points for each element in a one element array', function() {
//       let scatterplot = new Scatterplot();
//       scatterplot.data = [10];
//       scatterplot.generatePts("a-sphere");
//       // let result = document.querySelector('a-sphere')!.getAttribute('position');
//       // console.log(result);
//       // expect(result).toEqual("0 0 -100");
//       // expect(window.document).toBe(1);
      
//     });
//     // it('places spherical points for each element in a short array', function() {
//     //   let scatterplot = new Scatterplot();
//     //   scatterplot.data = [0, 10, 20, 30];
//     //   let result = scatterplot.generatePts("a-sphere");
//     //   //figure out what expect should be
//     // });
//   });