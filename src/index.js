const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    icon: path.join(__dirname, 'logo_256.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true, //for webView
      nodeIntegration: false,
      webSecurity: false,
      allowpopups: true,
      allowRunningInsecureContent: true,
    },
  });
  mainWindow.maximize();
  //mainWindow.webContents.openDevTools();
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};
ipcMain.handle('quit-app', () => {
  app.quit();
});
app.on('ready', createWindow);
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  };
});
// code. You can also put them in separate files and import them here.