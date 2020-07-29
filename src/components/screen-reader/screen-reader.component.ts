import { Component, Input, OnDestroy } from '@angular/core';
import { waitFor } from '../../utils/misc';
import { Subject } from 'rxjs';
import * as numbered from 'numbered';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

const defaultSilenceDuration = 5000;

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss'],
})
export class ScreenReaderComponent implements OnDestroy {
  @Input() repetitionDelay = 500; // duration (in ms) for which empty the live text when the same text needs to be read out consequently

  liveText: string | null = null;
  private shouldBreakSilence = false;
  private silence$ = new Subject();
  private cancel$ = new Subject();
  private destroy$ = new Subject();

  ngOnDestroy() {
    this.cancel$.next();
    this.cancel$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Makes a screen-reader software read out the text.
   *
   * @param text The text to read out.
   * @param shouldBreakSilence Whether to break silence or not after reading out the text.
   * @return The promise to be fulfilled with true after reading out finishes. If cancelled, it will be immediately fulfilled with false.
   */
  async readOut(text: string, shouldBreakSilence = true): Promise<boolean> {
    this.shouldBreakSilence = shouldBreakSilence;
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

    const read = await waitFor(this.estimateDuration(text), this.cancel$);
    if (read) {
      this.silence$.next();
    }
    return read;
  }

  /**
   * Cancels previously scheduled reading out.
   */
  cancel() {
    this.cancel$.next();
  }

  /**
   * Read out the text after nothing has been read for the given duration.
   *
   * @param text The text to read out.
   * @param silenceDuration The duration of silence.
   */
  breakSilence(text: string, silenceDuration = defaultSilenceDuration) {
    return this.silence$
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(silenceDuration))
      .pipe(filter(() => this.shouldBreakSilence))
      .subscribe(() => {
        this.liveText = text;
      });
  }

  /**
   * Estimates how long it would take to read the given text. Currently only works for English.
   *
   * @param text The text to estimate the duration of.
   */
  private estimateDuration(text: string) {
    // spell out numbers
    const plainText = text.replace(/\d+(\.\d+)?/g, match => numbered.stringify(+match));

    const letterDuration = 30;
    const wordDelay = 100;
    const sentenceDelay = 300;

    const countMatches = regexp => (plainText.match(regexp) ?? []).length;
    const sentences = countMatches(/[.?!]+/g);
    const words = countMatches(/\s+/g);
    const letters = plainText.replace(/\W/g, '').length;

    return sentenceDelay * sentences
      + wordDelay * words
      + letterDuration * letters;
  }
}
