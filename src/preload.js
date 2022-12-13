// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fileSystem", {
  sendDetermineNumberOfFileLines: (paths) =>
    ipcRenderer.send("send-determine-number-of-file-lines", paths),
  onDetermineNumberOfFileLines: (callback) => {
    ipcRenderer.on("on-determine-number-of-file-lines", callback);
  },
});
