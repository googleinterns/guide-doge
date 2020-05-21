import * as Tone from 'tone';

export class AudificationService {
  protected synth = new Tone.Synth().toDestination();

  audify(
    values: (number | null)[],
    pitchRange: [number, number],
    duration: number,
  ) {
    const part = new Tone.Part(
      (time, event) => {
        this.synth.triggerAttackRelease(event.note, event.dur, time);
      },
      [
        { time: 0, note: 'C4', dur: '4n' },
        { time: { '4n': 1, '8n': 1 }, note: 'E4', dur: '8n' },
        { time: '2n', note: 'G4', dur: '16n' },
        { time: { '2n': 1, '8t': 1 }, note: 'B4', dur: '4n' },
      ],
    );
    part.start(0);
    Tone.Transport.start();

    return () => {
      part.dispose();
      Tone.Transport.stop();
    };
  }
}
