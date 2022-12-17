// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("codeQuality", {
  sendDetermineNumberOfFileLines: (paths) =>
    ipcRenderer.send("send-determine-lines-of-code", paths),
  onDetermineNumberOfFileLines: (callback) => {
    ipcRenderer.on("on-determine-lines-of-code", callback);
  },
});
