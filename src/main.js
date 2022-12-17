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

//
const crypto = require("crypto");

function determineDuplicateFilesByHash(paths) {
  const pathHashCombinations = [];
  for (const path of paths) {
    const contents = fs.readFileSync(path);
    const hash = crypto.createHash("md5").update(contents).digest("hex");
    pathHashCombinations.push({ path: path, hash: hash });
  }

  const duplicates = [];

  for (const combination of pathHashCombinations) {
    if (
      pathHashCombinations.filter((x) => x.path === combination.path).length > 1 // TODO: maybe use any or something like that
    ) {
      duplicates.push(combination);
    }
  }

  if (duplicates.length === 0) {
    return "";
  }

  function compare(a, b) {
    if (a.hash < b.hash) {
      return -1;
    }
    if (a.hash > b.hash) {
      return 1;
    }
    return 0;
  }

  duplicates.sort(compare);

  let result = duplicates[0].path;
  for (let i = 1; i < duplicates.length; i++) {
    if (duplicates[i].path === duplicates[i - 1].path) {
      result += `\n${duplicates[i].path}`;
    } else {
      result += `\n\n${duplicates[i].path}`;
    }
  }

  return result;
}
