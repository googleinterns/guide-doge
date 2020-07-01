import { Component, Input, OnInit } from '@angular/core';
import { humanizeMeasureName } from '../../utils/formatters';
import { Meta, TabbedChartsMeta } from '../../datasets/types';

export type CardType = 'line' | 'bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() meta: Meta;
  humanizeMeasureName = humanizeMeasureName;
  currentTabTitle: string;

  get tabbed() {
    return this.meta.type === 'tabbed';
  }

  get titles() {
    if (this.tabbed) {
      return (this.meta as TabbedChartsMeta).metas.map(c => c.title);
    } else {
      return [this.meta.title];
    }
  }

  get currentChart(): Meta {
    if (this.tabbed) {
      const tabbedCharts = this.meta as TabbedChartsMeta;
      return tabbedCharts.metas.find(c => c.title === this.currentTabTitle) ||
        tabbedCharts.metas[0];
    } else {
      return this.meta;
    }
  }

  ngOnInit() {
    if (this.tabbed) {
      this.setCurrentTabTitle((this.meta as TabbedChartsMeta).metas[0].title);
    } else {
      this.setCurrentTabTitle('');
    }
  }

  setCurrentTabTitle(title) {
    this.currentTabTitle = title;
  }
}
