import { AfterViewChecked, Component, ElementRef } from '@angular/core';
import { AudificationD3 } from '../../d3/experiments/audification.d3';

@Component({
  selector: 'app-audification-experiment',
  templateUrl: './audification-experiment.component.html',
})
export class AudificationExperimentComponent implements AfterViewChecked {
  private audificationD3: AudificationD3;

  constructor(element: ElementRef) {
    this.audificationD3 = new AudificationD3(element);
  }

  ngAfterViewChecked() {
    this.audificationD3.apply({
      duration: 0,
      pitchRange: [0, 0],
    });
  }

}
