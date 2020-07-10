import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VRScatterPlotComponent } from './components/vr-scatter-plot/vr-scatter-plot.component';
import {VRScatterPlotModule} from './components/vr-scatter-plot/vr-scatter-plot.module';
import { VRAccessibilityComponent } from './components/vr-accessibility/vr-accessibility.component';
import { VRAccessibilityModule } from './components/vr-accessibility/vr-accessibility.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'webVR', component: VRScatterPlotComponent, pathMatch: 'full' },
  { path: 'accessibilityVR', component: VRAccessibilityComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardModule,
    VRScatterPlotModule,
    VRAccessibilityModule
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
