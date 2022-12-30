// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("duplicateFiles", {
  getDuplicateFiles: (paths) => ipcRenderer.invoke("getDuplicateFiles", paths),
});

contextBridge.exposeInMainWorld("codeQuality", {
  sendDetermineLinesOfCode: (paths) =>
    ipcRenderer.send("send-determine-lines-of-code", paths),
  onDetermineLinesOfCode: (callback) => {
    ipcRenderer.on("on-determine-lines-of-code", callback);
  },
});
