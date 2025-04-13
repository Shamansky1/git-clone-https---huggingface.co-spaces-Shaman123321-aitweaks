import ToneEqualizer from './tone-equalizer';

class EqualizerUI {
  constructor(containerId = 'equalizer-container') {
    this.equalizer = new ToneEqualizer();
    this.container = document.getElementById(containerId) || document.body;
    this.createUI();
  }

  createUI() {
    const wrapper = document.createElement('div');
    wrapper.className = 'equalizer-ui';
    
    // Preset buttons in two rows
    const presetsDiv = document.createElement('div');
    presetsDiv.className = 'equalizer-presets';
    
    // First row of presets
    const row1 = document.createElement('div');
    ['footsteps', 'fps', 'battle_royale'].forEach(preset => {
      const btn = this.createPresetButton(preset);
      row1.appendChild(btn);
    });
    
    // Second row of presets
    const row2 = document.createElement('div');
    ['rpg', 'music', 'voice', 'flat'].forEach(preset => {
      const btn = this.createPresetButton(preset);
      row2.appendChild(btn);
    });

    presetsDiv.appendChild(row1);
    presetsDiv.appendChild(row2);

    // Band controls
    const bandsDiv = document.createElement('div');
    bandsDiv.className = 'equalizer-bands';
    
    ['low', 'mid', 'high'].forEach(band => {
      const bandControl = document.createElement('div');
      bandControl.className = 'equalizer-band';
      
      const label = document.createElement('span');
      label.textContent = band;
      
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = -12;
      slider.max = 12;
      slider.step = 0.5;
      slider.value = 0;
      slider.dataset.band = band;
      
      slider.addEventListener('input', (e) => {
        this.equalizer.setBand(e.target.dataset.band, parseFloat(e.target.value));
      });
      
      bandControl.appendChild(slider);
      bandControl.appendChild(label);
      bandsDiv.appendChild(bandControl);
    });

    // Start button
    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Equalizer';
    startBtn.className = 'equalizer-start';
    startBtn.addEventListener('click', () => this.equalizer.start());

    wrapper.appendChild(presetsDiv);
    wrapper.appendChild(bandsDiv);
    wrapper.appendChild(startBtn);
    this.container.appendChild(wrapper);
  }

  createPresetButton(preset) {
    const btn = document.createElement('button');
    btn.textContent = this.formatPresetName(preset);
    btn.dataset.preset = preset;
    btn.addEventListener('click', () => this.equalizer.setPreset(preset));
    return btn;
  }

  formatPresetName(preset) {
    return preset.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}

export default EqualizerUI;
