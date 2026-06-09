const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onHardwareId: (callback) => ipcRenderer.on('hardware-id', (_event, value) => callback(value))
});
