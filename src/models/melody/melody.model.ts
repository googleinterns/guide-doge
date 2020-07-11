import * as Tone from 'tone';

export type OnSeek = (index: number) => void;

export class Melody {
  pointIndex = 0;
  private synth = new Tone.Synth().toDestination();
  private inclusive = true; // if true, playing the melody starting inclusively from pointIndex
  private reversed = false; // if true, playing the melody backward
  private readonly frequencies: number[];
  private timeoutId: number | null = null;

  constructor(
    private values: number[],
    private frequencyRange: [number, number],
    private noteDuration: number, // duration (in ms) of a note
    private onSeek?: OnSeek,
  ) {
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const [minFrequency, maxFrequency] = this.frequencyRange;
    const minKeyNumber = Melody.getKeyNumber(minFrequency);
    const maxKeyNumber = Melody.getKeyNumber(maxFrequency);
    this.frequencies = values.map(value => {
      if (maxValue === minValue) {
        return Melody.getFrequency(minKeyNumber);
      } else {
        const keyNumber = (value - minValue) / (maxValue - minValue) * (maxKeyNumber - minKeyNumber) + minKeyNumber;
        return Melody.getFrequency(keyNumber);
      }
    });
  }

  get duration() {
    return this.noteDuration * this.values.length;
  }

  get isPlaying() {
    return this.timeoutId !== null;
  }

  get isEnded() {
    return (
      this.reversed && this.pointIndex === 0 ||
      !this.reversed && this.pointIndex === this.values.length - 1
    );
  }

  get nextPointIndex() {
    if (this.isEnded) {
      return this.reversePointIndex(this.pointIndex); // bring playhead to the opposite end
    }
    const offset = this.inclusive ? 0 : (this.reversed ? -1 : +1);
    return this.pointIndex + offset;
  }

  private static getKeyNumber(frequency: number) {
    return Math.log2(frequency / 440) * 12 + 49;
  }

  private static getFrequency(keyNumber: number) {
    return Math.pow(2, (keyNumber - 49) / 12) * 440;
  }

  async prepare() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
  }

  resume(reversed: boolean) {
    if (this.isPlaying) {
      return;
    }
    this.reversed = reversed;
    this.playNextNote();
  }

  pause() {
    if (this.timeoutId !== null) {
      window.clearInterval(this.timeoutId);
      this.timeoutId = null;
    }
  }

  seekTo(pointIndex: number, inclusive = false) {
    this.pointIndex = pointIndex;
    this.inclusive = this.isEnded || inclusive;
    this.onSeek?.(this.pointIndex);
  }

  dispose() {
    this.pause();
    this.synth.dispose();
  }

  private playNextNote() {
    this.seekTo(this.nextPointIndex);
    const frequency = this.frequencies[this.pointIndex];
    this.synth.triggerAttackRelease(frequency, this.noteDuration / 1000);
    if (!this.isEnded) {
      this.timeoutId = window.setTimeout(() => {
        this.timeoutId = null;
        this.playNextNote();
      }, this.noteDuration);
    }
  }

  private reversePointIndex(index: number) {
    return (this.values.length - 1) - index;
  }
}
