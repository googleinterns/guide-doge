import { ComponentRef, Directive, Host, OnDestroy, OnInit, Self } from '@angular/core';
import { PreferenceService } from '../../services/preference/preference.service';
import { GeoMapNavigationPreference } from '../../services/preference/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeoMapComponent } from '../../components/geo-map/geo-map.component';

@Directive({
  selector: '[appGeoMapNavigation]',
})
export class GeoMapNavigationDirective implements OnInit, OnDestroy {
  private componentRef: ComponentRef<unknown> | null;
  private destroy$ = new Subject();

  constructor(
    private preferenceService: PreferenceService,
    @Host() @Self() private host: GeoMapComponent,
  ) {
  }

  ngOnInit() {
    this.preferenceService.geoMapNavigation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async preference => {
        if (preference.enabled) {
          await this.attach(preference);
        } else {
          this.detach();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.detach();
  }

  async attach(preference: GeoMapNavigationPreference) {
    this.detach();

    const { host } = this;
    const { GeoMapNavigationModule } = await import('../../components/geo-map-navigation/geo-map-navigation.module');
    this.componentRef = await host.a11yPlaceholder.addComponent(GeoMapNavigationModule, host, preference);
  }

  detach() {
    if (this.componentRef) {
      this.host.a11yPlaceholder.removeComponent(this.componentRef);
      this.componentRef = null;
    }
  }
}
