import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudificationExperimentModule } from './pages/audification-experiment/audification-experiment.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AudificationExperimentModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
