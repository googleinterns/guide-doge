import * as Tone from 'tone';

export class AudificationService {
  private synth = new Tone.Synth().toDestination();

  audify(
    values: number[],
    frequencyRange: [number, number],
    duration,
  ) {
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const [minFrequency, maxFrequency] = frequencyRange;
    const minN = Math.log2(minFrequency);
    const maxN = Math.log2(maxFrequency);
    const sequence = new Tone.Sequence(
      (time, value) => {
        const n = (value - minValue) / (maxValue - minValue) * (maxN - minN) + minN;
        const frequency = Math.pow(2, n);
        this.synth.triggerAttackRelease(frequency, '4n', time);
      },
      values,
    );
    sequence.playbackRate = (values.length / 4) / duration;
    sequence.loop = 1;
    return sequence;
  }
}
