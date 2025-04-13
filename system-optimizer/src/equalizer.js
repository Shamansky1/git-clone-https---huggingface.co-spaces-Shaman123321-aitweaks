class Equalizer {
  constructor(context) {
    this.audioContext = context || this.createAudioContext();
    this.bands = [];
    this.input = this.audioContext.createGain();
    this.output = this.audioContext.createGain();
    this.usingWorklet = false;
    
    this.initAudioProcessing();
    this.createBands([
      { frequency: 80, type: 'lowshelf' },
      { frequency: 200 },
      { frequency: 500 },
      { frequency: 1200 },
      { frequency: 3000 },
      { frequency: 7000 },
      { frequency: 14000, type: 'highshelf' }
    ]);
  }

  createAudioContext() {
    try {
      return new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.error('Web Audio API not supported');
      throw new Error('AudioContext not available');
    }
  }

  async initAudioProcessing() {
    // Try AudioWorklet first
    if (this.audioContext.audioWorklet && this.audioContext.audioWorklet.addModule) {
      try {
        await this.audioContext.audioWorklet.addModule('audio-processor.js');
        this.workletNode = new AudioWorkletNode(this.audioContext, 'audio-processor');
        this.input.connect(this.workletNode);
        this.workletNode.connect(this.output);
        this.usingWorklet = true;
        return;
      } catch (workletError) {
        console.warn('AudioWorklet failed, falling back:', workletError);
      }
    }
    
    // Fallback to ScriptProcessorNode
    console.warn('Using legacy ScriptProcessorNode fallback');
    this.processorNode = this.audioContext.createScriptProcessor(4096, 1, 1);
    this.processorNode.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i]; // Basic passthrough - actual processing would go here
      }
    };
    this.input.connect(this.processorNode);
    this.processorNode.connect(this.output);
  }

  createBands(bandConfigs) {
    let lastNode = this.usingWorklet ? this.workletNode : this.input;
    
    bandConfigs.forEach(config => {
      const filter = this.audioContext.createBiquadFilter();
      filter.type = config.type || 'peaking';
      filter.frequency.value = config.frequency;
      filter.Q.value = 1.0;
      filter.gain.value = 0;
      
      lastNode.connect(filter);
      lastNode = filter;
      this.bands.push(filter);
    });
    
    lastNode.connect(this.output);
  }

  // ... rest of the methods remain the same
}

module.exports = Equalizer;
