import { Melody } from './melody.model';
import * as Tone from 'tone';

describe('Melody', () => {
  const values = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const frequencyRange: [number, number] = [256, 2048];
  const noteDuration = 0.1; // duration (in seconds) of a note
  let melody: Melody;
  const delay = 200; // delay (in ms) between playing the melody and evaluating playhead

  beforeAll(async () => {
    await Tone.start();
  });

  beforeEach(() => {
    melody = new Melody(values, frequencyRange, noteDuration);
  });

  afterEach(() => {
    melody.dispose();
    Tone.Transport.stop();
  });

  it('should instantiate.', () => {
    expect(melody).toBeInstanceOf(Melody);
  });

  it('should calculate the duration correctly.', () => {
    expect(melody.duration).toBe(noteDuration * values.length);
  });

  it('should have playhead at the very beginning of the sequence', () => {
    expect(melody.currentSeconds).toBeCloseTo(0, 1e-3);
  });

  it('should play the sequence forwards.', async () => {
    await melody.resume(false);
    expect(melody.isPlaying).toBeTrue();
    expect(melody.isEnded).toBeFalse();
    await new Promise(resolve => window.setTimeout(resolve, delay));
    expect(melody.currentSeconds).toBeGreaterThan(0);
  });

  it('should play the sequence backwards.', async () => {
    await melody.resume(true);
    expect(melody.isPlaying).toBeTrue();
    expect(melody.isEnded).toBeFalse();
    await new Promise(resolve => window.setTimeout(resolve, delay));
    expect(melody.currentSeconds).toBeLessThan(melody.duration);
  });

  it('should pause the sequence.', async () => {
    await melody.resume(false);
    expect(melody.isPlaying).toBeTrue();
    melody.pause();
    expect(melody.isPlaying).toBeFalse();
  });

  it('should seek to the closest note to the given second.', () => {
    for (let index = 0; index < values.length; index++) {
      melody.seekTo(index * noteDuration);
      expect(melody.getCurrentDatumIndex()).toBe(index);
    }
  });
});
