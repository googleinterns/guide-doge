import { Component } from '@angular/core';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../../models/data-cube/presets';

@Component({
  selector: 'app-audification-experiment',
  templateUrl: './audification-experiment.component.html',
})
export class AudificationExperimentComponent {
  private measureNames = [activeUserMeasure, revenueMeasure, eventCountMeasure].map(measure => measure.name);
  measureName = this.measureNames[0];

  handleClick() {
    const index = this.measureNames.indexOf(this.measureName);
    this.measureName = this.measureNames[(index + 1) % this.measureNames.length];
  }
}
