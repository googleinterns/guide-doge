import { Scatterplot } from './scatterplot.d3';

fdescribe('VR Scatter Plot', () => {
  let shape = 'a-sphere';
  let element: HTMLElement;
  let scatterplot: Scatterplot;

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot(shape);
  });
  it('places no points bc 1:1 correspondence with empty element array', () => {
    scatterplot.init(element, []);
    let expectedPosArray = [];
    let result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
  it('places points for each element in a one element array', () => {
    scatterplot.init(element, [10]);
    let expectedPosArray = ['0 0 -20'];
    let result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
  it('places points for each element in a two element array', () => {
    scatterplot.init(element, [10, 10]);
    let expectedPosArray = ['0 0 -20', '5 10 -20'];
    let result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
  it('places points for each element in a eight element array', () => {
    scatterplot.init(element, [10, 10, 20, 20, 30, 30, 40, 40]);
    let expectedPosArray = ['0 0 -20', '5 10 -20', '10 20 -40', '15 30 -40', '20 40 -60', '25 50 -60', '30 60 -80', '35 70 -80'];
    let result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
});

// returns array of actual position vectors
function getPosition(element: HTMLElement, shape: string): string[]{
  let childrenArray = element.querySelectorAll(shape);
  let positionArray: string[] = [];
  for (let i = 0; i < childrenArray.length; i++){
    positionArray.push(childrenArray[i].getAttribute('position')!);
  }
  return positionArray;
}
