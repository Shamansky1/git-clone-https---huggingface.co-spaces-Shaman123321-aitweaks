# Audio Equalizer API Documentation

## Overview
The Audio Equalizer is designed to enhance audio playback by allowing users to adjust frequency bands and apply presets tailored for different audio scenarios, such as gaming, music, and voice chat.

## Classes

### ToneEqualizer
The main class for managing the equalizer functionality.

#### Constructor
```javascript
constructor();
```
- Initializes the equalizer with default settings and profiles.

#### Methods

- **start()**
  ```javascript
  async start();
  ```
  - Starts the audio processing and connects to the audio input.

- **setPreset(presetName)**
  ```javascript
  setPreset(presetName);
  ```
  - Applies the specified preset to the equalizer.
  - **Parameters**:
    - `presetName`: The name of the preset to apply (e.g., 'footsteps', 'music').

- **setBand(band, value)**
  ```javascript
  setBand(band, value);
  ```
  - Adjusts the gain for a specific frequency band.
  - **Parameters**:
    - `band`: The band to adjust ('low', 'mid', 'high').
    - `value`: The gain value to set.

- **enhanceFootsteps(buffer)**
  ```javascript
  enhanceFootsteps(buffer);
  ```
  - Enhances the audio for footsteps.

- **enhanceEnvironment(buffer)**
  ```javascript
  enhanceEnvironment(buffer);
  ```
  - Enhances the audio for environmental sounds.

## Presets
The following presets are available:
- **footsteps**: Optimized for hearing footsteps in games.
- **fps**: Enhances clarity for competitive FPS games.
- **battle_royale**: Balances sounds for large maps.
- **rpg**: Boosts ambient sounds and voice clarity.
- **music**: Balanced for music playback.
- **voice**: Optimized for clear voice chat.
- **flat**: Neutral settings.

## Usage Example
```javascript
const equalizer = new ToneEqualizer();
equalizer.start();
equalizer.setPreset('footsteps');
```

## Performance
The equalizer is designed to operate with low latency, utilizing GPU-accelerated FFT for real-time audio processing.

## License
This project is licensed under the MIT License.
