const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const { machineIdSync } = require('node-machine-id');
const fs = require('fs');

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimes = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml'
  };
  return mimes[ext] || 'application/octet-stream';
}

function getAppRoot() {
  return app.isPackaged ? path.join(process.resourcesPath, '..') : app.getAppPath();
}

function registerAppProtocol() {
  protocol.handle('app', async (request) => {
    let urlPath = request.url.replace('app://', '');
    
    // Fix: Remove the 'index.html/' prefix that gets added to relative paths
    if (urlPath.startsWith('index.html/')) {
      urlPath = urlPath.replace('index.html/', '');
    }

    if (urlPath === '' || urlPath === '/') urlPath = 'index.html';
    
    // Dynamically resolve path based on dev/prod
    const appRoot = getAppRoot();
    const filePath = path.join(appRoot, 'web', 'out', urlPath);
    console.log('Attempting to load:', filePath);
    
    try {
      if (fs.existsSync(filePath)) {
        console.log('Found:', filePath);
        return new Response(fs.readFileSync(filePath), {
          headers: { 'content-type': getMimeType(filePath) }
        });
      }
    } catch (err) { console.error('Protocol Path error:', filePath, err); }
    
    const fallback = path.join(appRoot, 'web', 'out', 'index.html');
    console.log('Falling back to:', fallback);
    return new Response(fs.readFileSync(fallback), {
      headers: { 'content-type': 'text/html' }
    });
  });
}

function createWindow() {
  const hardwareId = machineIdSync();
  const win = new BrowserWindow({
    width: 1280, height: 800,
    webPreferences: { contextIsolation: true }
  });
  win.loadURL('app://index.html');
}

app.whenReady().then(() => {
  registerAppProtocol();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
