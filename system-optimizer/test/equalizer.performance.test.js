const Equalizer = require('../src/equalizer');
const { JSDOM } = require('jsdom');

// Set up DOM environment
const dom = new JSDOM('<!DOCTYPE html>', {
  url: 'http://localhost',
  pretendToBeVisual: true
});

global.window = dom.window;
global.document = dom.window.document;

describe('Equalizer Performance', () => {
  let audioContext;
  let equalizer;

  beforeAll(() => {
    // Mock AudioContext if needed
    if (!window.AudioContext && !window.webkitAudioContext) {
      window.AudioContext = class MockAudioContext {
        constructor() {
          this.state = 'running';
          this.destination = {};
          this.audioWorklet = { addModule: async () => {} };
        }
        createGain() { return { connect: () => {} }; }
        createBiquadFilter() { return { connect: () => {} }; }
        close() { this.state = 'closed'; }
      };
    }
  });

  beforeEach(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    equalizer = new Equalizer(audioContext);
  });

  afterEach(async () => {
    if (audioContext && audioContext.state !== 'closed') {
      await audioContext.close();
    }
  });

  test('initializes successfully', async () => {
    await expect(equalizer.initAudioProcessing()).resolves.not.toThrow();
    expect(equalizer.input).toBeDefined();
    expect(equalizer.output).toBeDefined();
  });

  test('processes audio with low latency', (done) => {
    jest.setTimeout(500);
    const start = performance.now();
    equalizer.setGain(0, 2.5);
    
    setTimeout(() => {
      const latency = performance.now() - start;
      console.log(`Processing latency: ${latency}ms`);
      expect(latency).toBeLessThan(50);
      done();
    }, 100);
  });
});
