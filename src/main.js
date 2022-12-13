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

//
const fs = require("fs");

ipcMain.on("send-determine-number-of-file-lines", (e, paths) => {
  mainWindow.webContents.send(
    "on-determine-number-of-file-lines",
    determineNumberOfFileLines(paths)
  );
});

function determineNumberOfFileLines(paths) {
  let result = 0;

  for (let path of paths) {
    if (pathIsDirectory(path)) {
      // const subPaths = getDirectoryPaths(path);
      // result += determineNumberOfFileLines(subPaths);
    } else {
      result += countLines(path);
    }
  }

  return result;
}

function getDirectoryPaths(path) {
  const result = [];
  const names = fs.readdirSync(path);

  for (const name of names) {
    result.push(`${path}/${name}`);
  }

  return result;
}

function pathIsDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}

function countLines(path) {
  const content = fs.readFileSync(path, { encoding: "utf8" });
  const lines = content.split("\n");

  return lines.length;
}
