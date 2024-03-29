const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // Security, this property can give protection when true
      sandbox: true, // Security, this property can give protection when true
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const codeQuality = require("./main modules/codeQuality.js");

ipcMain.on("send-determine-lines-of-code", (e, paths) => {
  mainWindow.webContents.send(
    "on-determine-lines-of-code",
    codeQuality.determineLinesOfCode(paths)
  );
});

const duplicateFiles = require("./main modules/duplicateFiles.js");

async function getDuplicateFiles(e, paths) {
  return duplicateFiles.determineDuplicateFiles(paths);
}
ipcMain.handle("getDuplicateFiles", getDuplicateFiles);

const webScraper = require("./main modules/webScraper.js");

async function getH1InnerHTML(e, urlsString) {
  return webScraper.getH1InnerHTML(urlsString);
}
ipcMain.handle("getH1InnerHTML", getH1InnerHTML);
