import * as Tone from 'tone';
import { BaseD3 } from './base.d3';
import RenderOptions = Audification.RenderOptions;

export namespace Audification {
  export interface RenderOptions {
  }
}

export class AudificationD3 extends BaseD3<RenderOptions> {
  protected synth = new Tone.Synth().toDestination();

  protected render(renderOptions: RenderOptions) {
    /*const svg = this.container.selectAll('svg');
    svg.attr('role', 'img');
    svg.attr('aria-label', 'hmm');
    svg.on('focus', async () => {
      if (Tone.getContext().state === 'suspended') {
        await Tone.start();
      }
      const dispose = this.audify([], [0, 0], 0);
      svg.on('blur', () => {
        svg.on('blur', null);
        dispose();
      });
    });*/

    return () => {
    };
  }

  /*private audify(
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
  }*/
}
