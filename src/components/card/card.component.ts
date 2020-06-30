import { Component, Input, OnInit } from '@angular/core';
import { GUIDE_DOGE, t } from '../../assets/i18n';
import { humanizeMeasureName } from '../../utils/formatters';
import { ChartMetaType, TabbedChartsMeta } from '../../datasets/types';

export type CardType = 'line' | 'bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() chart: ChartMetaType;
  humanizeMeasureName = humanizeMeasureName;
  currentTabTitle: string;

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  get tabbed() {
    return this.chart.type === 'tabbed';
  }

  get titles() {
    if (this.tabbed) {
      return (this.chart as TabbedChartsMeta).charts.map(c => c.title);
    } else {
      return [this.chart.title];
    }
  }

  get currentChart(): ChartMetaType {
    if (this.tabbed) {
      const tabbedChart = this.chart as TabbedChartsMeta;
      return tabbedChart.charts.find(c => c.title === this.currentTabTitle) ||
        tabbedChart.charts[0];
    } else {
      return this.chart;
    }
  }

  ngOnInit() {
    if (this.tabbed) {
      this.setCurrentTabTitle((this.chart as TabbedChartsMeta).charts[0].title);
    } else {
      this.setCurrentTabTitle('');
    }
  }

  setCurrentTabTitle(title) {
    this.currentTabTitle = title;
  }
}
