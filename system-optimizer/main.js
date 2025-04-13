// Correct Electron import for ES modules
import electron from 'electron';
const { app, BrowserWindow } = electron;

// Import optimization function
import { optimizeSystem } from './src/windows-optimizer.js';

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

  // Load and style the interface
  mainWindow.loadFile('index.html');
  
  mainWindow.webContents.on('did-finish-load', () => {
    // Apply custom styles
    mainWindow.webContents.insertCSS(`
      body {
        background: url('../background.png') no-repeat center center fixed;
        background-size: cover;
        color: #ffffff;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      #music-player {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.7);
        padding: 10px;
        border-radius: 5px;
      }
    `);

    // Run initial optimization
    optimizeSystem().then(console.log);
  });

  // Setup periodic optimization
  setInterval(() => {
    optimizeSystem().then(console.log);
  }, 300000); // Every 5 minutes
}

// Start the application
app.whenReady().then(() => {
  createAppWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createAppWindow();
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
