import { Melody } from './melody.model';
import * as Tone from 'tone';

describe('Melody', () => {
  const values = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const frequencyRange: [number, number] = [256, 2048];
  const noteDuration = 100; // duration (in ms) of a note
  let melody: Melody;
  const delay = noteDuration * 1.5; // delay (in ms) between playing the melody and evaluating playhead
  const gracePeriod = 200; // grace period (in ms) before Tone.js can start without errors

  beforeAll(async () => {
    await new Promise(resolve => window.setTimeout(resolve, gracePeriod));
    await Tone.start();
  });

  beforeEach(() => {
    melody = new Melody(values, frequencyRange, noteDuration);
  });

  afterEach(() => {
    melody.dispose();
  });

  it('should instantiate.', () => {
    expect(melody).toBeInstanceOf(Melody);
  });

  it('should calculate the duration correctly.', () => {
    expect(melody.duration).toBe(noteDuration * values.length);
  });

  it('should have playhead at the very beginning of the sequence', () => {
    expect(melody.currentDatumIndex).toBe(0);
  });

  it('should play the sequence forwards.', async () => {
    await melody.resume(false);
    expect(melody.isPlaying).toBeTrue();
    expect(melody.isEnded).toBeFalse();
    await new Promise(resolve => window.setTimeout(resolve, delay));
    expect(melody.currentDatumIndex).toBeGreaterThan(0);
  });

  it('should play the sequence backwards.', async () => {
    await melody.resume(true);
    expect(melody.isPlaying).toBeTrue();
    expect(melody.isEnded).toBeFalse();
    await new Promise(resolve => window.setTimeout(resolve, delay));
    expect(melody.currentDatumIndex).toBeLessThan(values.length - 1);
  });

  it('should pause the sequence.', async () => {
    await melody.resume(false);
    expect(melody.isPlaying).toBeTrue();
    melody.pause();
    expect(melody.isPlaying).toBeFalse();
  });

  it('should seek to the given index.', () => {
    for (let index = 0; index < values.length; index++) {
      melody.seekTo(index);
      expect(melody.currentDatumIndex).toBe(index);
    }
  });
});
