import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss'],
})
export class ScreenReaderComponent {
  @Input() repetitionDelay = 500; // duration (in ms) for which empty the live text when the same text needs to be read out consequently

  liveText: string | null = null;
  private readOutTimeoutId: number | null = null;

  /**
   * Make a screen-reader software read out the text.
   *
   * @param text The text to read out.
   * @return The delay before reading out.
   */
  readOut(text: string) {
    if (this.readOutTimeoutId !== null) {
      window.clearTimeout(this.readOutTimeoutId);
      this.readOutTimeoutId = null;
    }
    const repetitive = this.liveText === text;
    if (repetitive) {
      this.liveText = null;
      this.readOutTimeoutId = window.setTimeout(() => {
        this.readOutTimeoutId = null;
        this.readOut(text);
      }, this.repetitionDelay);
    } else {
      this.liveText = text;
    }
    return repetitive ? this.repetitionDelay : 0;
  }
}
