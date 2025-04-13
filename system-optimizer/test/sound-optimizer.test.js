const SoundOptimizer = require('../src/sound-optimizer');
const assert = require('assert');

describe('SoundOptimizer', () => {
  let optimizer;
  
  beforeEach(() => {
    optimizer = new SoundOptimizer();
  });

  it('should apply footsteps profile correctly', () => {
    const testBuffer = { gain: 1.0 };
    const processed = optimizer.enhanceFootsteps(testBuffer);
    assert.equal(processed.gain, 2.5);
  });

  it('should override clarity settings', () => {
    const testBuffer = { clarity: 0.5 };
    const processed = optimizer.enhanceEnvironment(testBuffer);
    assert.equal(processed.clarity, 0.8);
  });

  it('should apply default spatial settings', () => {
    const testBuffer = {};
    const processed = optimizer.process(testBuffer, 'unknown');
    assert.equal(processed.spatial, true);
  });
});
