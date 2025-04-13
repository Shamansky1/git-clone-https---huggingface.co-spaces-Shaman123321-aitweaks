// Final working Electron configuration
const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const { optimizeSystem } = require('./src/windows-optimizer.cjs');

console.log('Launching Electron v' + process.versions.electron);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    // Apply all UI customizations
    mainWindow.webContents.insertCSS(`
      body {
        background: url('${path.join(__dirname, '../background.png')}') no-repeat center center fixed;
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

    // Run initial optimizations
    optimizeSystem().then(console.log);
  });

  // Set up periodic optimizations
  setInterval(() => {
    optimizeSystem().then(console.log);
  }, 300000); // Every 5 minutes
}

// Electron app event handlers
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
