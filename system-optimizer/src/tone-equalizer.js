let Tone; // Will be initialized dynamically

class ToneEqualizer {
  constructor(useMock = false) {
    this.eq = null;
    this.useMock = useMock;
    this.presets = {
      footsteps: { low: -5, mid: 8, high: 4 },
      fps: { low: 2, mid: 6, high: 4 },
      battle_royale: { low: 4, mid: 5, high: 3 },
      rpg: { low: 1, mid: 3, high: 2 },
      music: { low: 3, mid: 1, high: 2 },
      voice: { low: -3, mid: 5, high: 1 },
      flat: { low: 0, mid: 0, high: 0 }
    };
    this.mediaStream = null;
    this.currentPreset = 'flat';
  }

  async init() {
    if (this.useMock) {
      const { default: EQ3Mock } = await import('../test/mocks/eq3-mock.js');
      this.eq = new EQ3Mock();
      return;
    }

    Tone = await import('tone');
    await Tone.start();
    this.eq = new Tone.EQ3().toDestination();
    this.eq.lowFrequency.value = 250;
    this.eq.highFrequency.value = 4000;
  }

  async start() {
    if (!this.eq) await this.init();
    if (this.useMock) return true;
    
    try {
      this.mediaStream = await Tone.UserMedia.start();
      this.mediaStream.connect(this.eq);
      return true;
    } catch (err) {
      console.error('Audio setup error:', err);
      return false;
    }
  }

  setPreset(presetName) {
    if (this.presets[presetName] && this.eq) {
      this.currentPreset = presetName;
      const preset = this.presets[presetName];
      this.eq.low.value = preset.low;
      this.eq.mid.value = preset.mid;
      this.eq.high.value = preset.high;
    }
  }

  setBand(band, value) {
    if (this.eq) {
      switch(band) {
        case 'low': this.eq.low.value = value; break;
        case 'mid': this.eq.mid.value = value; break;
        case 'high': this.eq.high.value = value; break;
      }
    }
  }

  processAudio(buffer) {
    if (!this.eq) return;
    // Audio processing logic here
  }

  disconnect() {
    if (this.mediaStream) {
      this.mediaStream.disconnect();
      if (!this.useMock) Tone.UserMedia.stop();
    }
  }
}

export default ToneEqualizer;
