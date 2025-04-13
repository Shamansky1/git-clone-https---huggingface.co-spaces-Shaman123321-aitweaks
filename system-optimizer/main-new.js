import electron from 'electron';
const { app, BrowserWindow } = electron;

import { optimizeSystem } from './src/windows-optimizer.js';
import AdaptiveOptimizer from './src/adaptive-optimizer-fixed.js';
import SoundOptimizer from './src/sound-optimizer-new.js';

// Initialize optimizers
const adaptiveOptimizer = new AdaptiveOptimizer();
const soundOptimizer = new SoundOptimizer();

async function initializeOptimizers() {
  await soundOptimizer.init();
}

function createAppWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
  
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(`
      body {
        background: url('../background.png') no-repeat center center fixed;
        background-size: cover;
        color: #ffffff;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      #equalizer-ui {
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: rgba(0,0,0,0.7);
        padding: 10px;
        border-radius: 5px;
      }
    `);

    // Run initial optimizations
    optimizeSystem().then(console.log);
    adaptiveOptimizer.autoTune().catch(console.error);
  });

  // Periodic optimizations
  setInterval(() => {
    optimizeSystem().then(console.log);
    adaptiveOptimizer.autoTune().catch(console.error);
  }, 300000);
}

// Start the application
app.whenReady()
  .then(initializeOptimizers)
  .then(createAppWindow)
  .catch(console.error);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createAppWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
