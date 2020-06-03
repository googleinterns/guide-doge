import { Component, Host } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { AudificationService } from '../../services/audification/audification.service';
import * as Tone from 'tone';

@Component({
  selector: 'app-line-chart-audification',
  templateUrl: './line-chart-audification.component.html',
})
export class LineChartAudificationComponent {
  public disposeMelody?: () => void;

  constructor(
    @Host() public component: LineChartComponent,
    private audificationService: AudificationService,
  ) {
  }

  async playMelody() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    this.disposeMelody = this.audificationService.audify([], [0, 0], 0);
  }
}
