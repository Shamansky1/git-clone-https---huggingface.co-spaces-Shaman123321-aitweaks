# AI Tweaks Local Testing Guide

## Setup Instructions
1. Clone repository to local machine
2. Install dependencies:
   ```bash
   cd system-optimizer && npm install
   ```
3. Ensure you have:
   - Node.js v18+
   - Electron v35.1.5
   - Python 3.8+ (for some optimizers)

## Testing Checklist
### Core Functionality
- [ ] Application launches without errors
- [ ] Main optimization interface loads
- [ ] Performance metrics display correctly
- [ ] Audio processing works
- [ ] Game profiles apply correctly

### Performance Tests
- [ ] CPU usage before/after optimizations
- [ ] Memory usage comparison
- [ ] FPS improvements in games
- [ ] Audio latency measurements

### Environment Tests
- [ ] Windows 10/11 compatibility
- [ ] Linux compatibility
- [ ] Different hardware configurations

## Expected Results
- At least 15% performance improvement in target games
- No system instability after optimizations
- All UI controls responsive
- No memory leaks after prolonged use

## Issue Reporting
When reporting issues, include:
1. OS version
2. Hardware specs
3. Steps to reproduce
4. Error messages/screenshots
5. Performance metrics before/after

## Test Command
```bash
npm test  # Runs automated test suite
