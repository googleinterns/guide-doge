import { Component, Input, OnInit } from '@angular/core';
import { humanizeMeasureName } from '../../utils/formatters';
import { Meta } from '../../datasets/metas/types';
import { TabbedChartsMeta } from '../../datasets/metas/tabbed-charts.meta';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent<T extends Meta> implements OnInit {
  @Input() meta: T;
  humanizeMeasureName = humanizeMeasureName;
  currentTabTitle?: string;

  get titles(): string[] {
    if (this.isTabbed()) {
      return this.meta.metas.map(c => c.title);
    } else {
      return [this.meta.title];
    }
  }

  get currentChart(): Meta {
    if (this.isTabbed()) {
      const { metas } = this.meta;
      return metas.find(c => c.title === this.currentTabTitle) ?? metas[0];
    } else {
      return this.meta;
    }
  }

  ngOnInit() {
    if (this.isTabbed()) {
      this.setCurrentTabTitle(this.meta.metas[0].title);
    } else {
      this.setCurrentTabTitle(undefined);
    }
  }

  setCurrentTabTitle(title) {
    this.currentTabTitle = title;
  }

  isTabbed(): this is CardComponent<TabbedChartsMeta> {
    return this.meta.type === 'tabbed';
  }
}
