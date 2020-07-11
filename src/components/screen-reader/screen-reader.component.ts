import { Component, Input, OnDestroy } from '@angular/core';
import { waitFor } from '../../utils/misc';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss'],
})
export class ScreenReaderComponent implements OnDestroy {
  @Input() repetitionDelay = 500; // duration (in ms) for which empty the live text when the same text needs to be read out consequently

  liveText: string | null = null;
  private cancel$ = new Subject();

  ngOnDestroy() {
    this.cancel$.next();
    this.cancel$.complete();
  }

  /**
   * Makes a screen-reader software read out the text.
   *
   * @param text The text to read out.
   * @return The promise to be fulfilled with true after reading out finishes. If cancelled, it will be immediately fulfilled with false.
   */
  async readOut(text: string): Promise<boolean> {
    this.cancel();
    const repetitive = this.liveText === text;
    if (repetitive) {
      this.liveText = null;
      const waited = await waitFor(this.repetitionDelay, this.cancel$);
      if (!waited) {
        return false;
      }
    }
    this.liveText = text;
    return waitFor(this.estimateDuration(text), this.cancel$);
  }

  /**
   * Cancels previously scheduled reading out.
   */
  cancel() {
    this.cancel$.next();
  }

  private estimateDuration(text: string) {
    const letterDuration = 50;
    const numberDuration = 200;
    const spaceDuration = 100;
    const periodDuration = 400;

    const countMatches = regexp => (text.match(regexp) ?? []).length;
    const letters = countMatches(/[a-zA-Z]/g);
    const numbers = countMatches(/\d/g);
    const spaces = countMatches(/\s+/g);
    const periods = countMatches(/[.?!]+/g);

    return letterDuration * letters
      + numberDuration * numbers
      + spaceDuration * spaces
      + periodDuration * periods;
  }
}
