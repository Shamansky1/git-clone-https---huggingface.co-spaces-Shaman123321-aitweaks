import { JSDOM } from 'jsdom';
import ToneEqualizer from '../src/tone-equalizer';

describe('ToneEqualizer Integration', () => {
  let equalizer;
  let dom;

  beforeAll(() => {
    // Set up DOM environment
    dom = new JSDOM('<!DOCTYPE html>', {
      url: 'http://localhost',
      pretendToBeVisual: true
    });
    
    global.window = dom.window;
    global.document = dom.window.document;
  });

  beforeEach(() => {
    // Create instance with mock enabled
    equalizer = new ToneEqualizer(true);
  });

  test('should initialize audio processing', async () => {
    await equalizer.init();
    expect(equalizer.eq).toBeDefined();
  });

  test('should switch presets correctly', async () => {
    await equalizer.init();
    equalizer.setPreset('footsteps');
    expect(equalizer.currentPreset).toBe('footsteps');
    expect(equalizer.eq.low.value).toBe(-5);
    expect(equalizer.eq.mid.value).toBe(8);
    expect(equalizer.eq.high.value).toBe(4);
  });

  test('should handle audio processing without errors', async () => {
    await equalizer.init();
    const mockBuffer = {
      getChannelData: () => new Float32Array(1024)
    };
    expect(() => equalizer.processAudio(mockBuffer)).not.toThrow();
  });
});
