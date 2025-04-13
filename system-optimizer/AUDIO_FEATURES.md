# Audio Optimization Features

## Core Components
1. **Game-Specific Audio Profiles**:
   - `footsteps`: Enhanced spatial audio for FPS games
   - `fps`: Balanced profile for competitive games
   - `default`: General purpose optimization

2. **Footstep Enhancement**:
   - Machine learning-based detection
   - RMS-based fallback when model missing
   - Configurable sensitivity

## Setup Instructions
1. For full functionality, add model files to:
   ```
   /models/footstep-model/
     - model.json
     - group1-shard1of2.bin
     - group1-shard2of2.bin
   ```

2. Configuration options:
```javascript
// In game profiles:
{
  audioProfile: 'footsteps', // or 'fps'
  footstepBoost: true,      // Enable enhancement
  footstepSensitivity: 0.7  // Detection threshold
}
```

## Troubleshooting
- If footstep detection isn't working:
  1. Verify model files exist
  2. Check console for loading errors
  3. Fallback will automatically activate if needed
