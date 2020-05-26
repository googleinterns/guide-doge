import * as Tone from 'tone';

export type OnSeek = (index: number, playing: boolean) => void;

export class Melody {
  private synth = new Tone.Synth().toDestination();
  private forwardSequence: Tone.Sequence;
  private backwardSequence: Tone.Sequence;
  private currentIndex = 0;
  private inclusive = true;
  private reversed = false;

  constructor(
    private values: number[],
    private frequencyRange: [number, number],
    private duration: number,
    private onSeek?: OnSeek,
  ) {
    const reversedValues = [...values].reverse();
    this.forwardSequence = this.audify(values);
    this.backwardSequence = this.audify(reversedValues);
  }

  get noteDuration() {
    return 1 / this.values.length * this.duration;
  }

  get currentSeconds() {
    return this.reversed ? this.duration - Tone.Transport.seconds : Tone.Transport.seconds;
  }

  async resume(reversed: boolean) {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    this.reversed = reversed;
    const offset = this.inclusive ? 0 : this.reversed ? -1 : +1;
    let nextIndex = this.currentIndex + offset;
    if (reversed && nextIndex < 0) {
      nextIndex = this.values.length - 1;
    } else if (!reversed && nextIndex >= this.values.length) {
      nextIndex = 0;
    }
    let nextSeconds = this.getSeconds(nextIndex);
    if (this.reversed) {
      this.backwardSequence?.start(0);
      this.forwardSequence?.stop(0);
      nextSeconds += this.noteDuration / 2;
      Tone.Transport.start(undefined, this.duration - nextSeconds);
    } else {
      this.backwardSequence?.stop(0);
      this.forwardSequence?.start(0);
      nextSeconds -= this.noteDuration / 2;
      Tone.Transport.start(undefined, nextSeconds);
    }
  }

  pause() {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.pause();
      const currentSeconds = this.reversed ? this.duration - Tone.Transport.seconds : Tone.Transport.seconds;
      this.seekTo(currentSeconds);
    }
  }

  seekTo(seconds: number, inclusive = false) {
    const playing = Tone.Transport.state === 'started';
    let index = this.getDatumIndex(seconds);
    this.onSeek?.(index, playing);
    if (this.reversed && index === 0) {
      index--;
    } else if (!this.reversed && index === this.values.length - 1) {
      index++;
    }
    this.currentIndex = index;
    this.inclusive = inclusive;
  }

  dispose() {
    this.forwardSequence.dispose();
    this.backwardSequence.dispose();
    this.synth.dispose();
  }

  private audify(values: number[]) {
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const [minFrequency, maxFrequency] = this.frequencyRange;
    const minPower = Math.log2(minFrequency);
    const maxPower = Math.log2(maxFrequency);
    const sequence = new Tone.Sequence(
      (time, value) => {
        this.seekTo(this.currentSeconds);
        const power = (value - minValue) / (maxValue - minValue) * (maxPower - minPower) + minPower;
        const frequency = Math.pow(2, power);
        this.synth.triggerAttackRelease(frequency, '4n', time);
      },
      values,
    );
    sequence.playbackRate = (values.length / 4) / this.duration;
    sequence.loop = 1;
    return sequence;
  }

  private getSeconds(index: number) {
    return (index + .5) * this.noteDuration;
  }

  private getDatumIndex(seconds: number) {
    const index = Math.round(seconds / this.noteDuration - .5);
    return Math.min(Math.max(index, 0), this.values.length - 1);
  }
}
