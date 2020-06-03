import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { BehaviorSubject } from 'rxjs';
import { Datum, RenderOptions } from '../../d3/xy-chart.d3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements RenderOptions, OnChanges, OnInit, OnDestroy {
  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;
  @Input() measureName: string;
  lineChartD3: LineChartD3;

  private dataSubject = new BehaviorSubject<Datum[]>([]);
  dataObservable = this.dataSubject.asObservable();

  private activeDatumSubject = new BehaviorSubject<Datum | null>(null);
  activeDatumObservable = this.activeDatumSubject.asObservable();

  constructor(
    private dataService: DataService,
    public element: ElementRef<HTMLElement>,
  ) {
    this.lineChartD3 = new LineChartD3(element);
  }

  set activeDatum(activeDatum: Datum | null) {
    this.activeDatumSubject.next(activeDatum);
  }

  ngOnInit() {
    this.lineChartD3.init(this);
  }

  ngOnDestroy() {
    this.lineChartD3.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('measureName' in changes) {
      const data = this.dataService.getMeasureOverDays(this.measureName);
      this.dataSubject.next(data);
      this.activeDatumSubject.next(null);
    }
  }
}
