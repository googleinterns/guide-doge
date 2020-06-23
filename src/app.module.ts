import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenReaderModule } from './services/screen-reader/screen-reader.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScreenReaderModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
