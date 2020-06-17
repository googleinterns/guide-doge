import { Scatterplot } from '../src/Scatterplot';
  //can't send null or undefined bc scatterplot.init only accepts number[]
  //write error handling for .init???
  describe('initializes accompanying data for scatterplot', function() {

    let element = document.createElement('a-scene');
    it('sends short array', function() {
      let scatterplot = new Scatterplot();
      let result = scatterplot.init(element, [0, 10, 20]);
      expect(result).toEqual([0, 10, 20]);
    });
    it('sends longer array', function() {
      let scatterplot = new Scatterplot();
      let result = scatterplot.init(element, [0, 10, 20, 30, 40, 50, 60]);
      expect(result).toEqual([0, 10, 20, 30, 40, 50, 60]);
    });
    it('sends one element array', function() {
      let scatterplot = new Scatterplot();
      let result = scatterplot.init(element, [1]);
      expect(result).toEqual([1]);
    });
    it('sends empty array', function() {  
      let scatterplot = new Scatterplot();
      let result = scatterplot.init(element, []);
      expect(result).toEqual([]);
    });
  });

  describe('places scatter points on plot', function() {
    var THREE = require('three');
    it('places no points bc 1:1 correspondence with empty element array', function() {
      let element = document.createElement('a-scene');
      let scatterplot = new Scatterplot();
      scatterplot.data = [];
      //expected output based on position function in scatterplot
      let expectedPosArray = [];
      scatterplot.container = element;
      let result = scatterplot.generatePts('a-sphere');
      expect(result).toEqual(expectedPosArray);
    });
    it('places points for each element in a one element array', function() {
      let element = document.createElement('a-scene');
      let scatterplot = new Scatterplot();
      scatterplot.data = [10];
      //expected output based on position function in scatterplot
      let expectedPosArray = ['0 0 -20'];
      scatterplot.container = element;
      let result = scatterplot.generatePts('a-sphere');
      expect(result).toEqual(expectedPosArray);
    });
    it('places points for each element in a two element array', function() {
      let element = document.createElement('a-scene');
      let scatterplot = new Scatterplot();
      scatterplot.data = [10, 10];
      //expected output based on position function in scatterplot
      let expectedPosArray = ['0 0 -20', '5 10 -20'];
      scatterplot.container = element;
      let result = scatterplot.generatePts('a-sphere');
      expect(result).toEqual(expectedPosArray);
    });
    it('places points for each element in a eight element array', function() {
      let element = document.createElement('a-scene');
      let scatterplot = new Scatterplot();
      scatterplot.data = [10, 10, 20, 20, 30, 30, 40, 40];
      //expected output based on position function in scatterplot
      let expectedPosArray = ['0 0 -20', '5 10 -20', '10 20 -40', '15 30 -40', '20 40 -60', '25 50 -60', '30 60 -80', '35 70 -80'];
      scatterplot.container = element;
      let result = scatterplot.generatePts('a-sphere');
      expect(result).toEqual(expectedPosArray);
    });
    
  });