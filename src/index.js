(async function main() {
  const {
    app,
    session,
    BrowserWindow
  } = require('electron')
  const {
    ElectronChromeExtensions
  } = require('electron-chrome-extensions')
  await app.whenReady()

  const browserSession = session.fromPartition('persist:custom')

  const extensions = new ElectronChromeExtensions({
    session: browserSession,
    createTab(details) {
      // Optionally implemented for chrome.tabs.create support
    },
    selectTab(tab, browserWindow) {
      // Optionally implemented for chrome.tabs.update support
    },
    removeTab(tab, browserWindow) {
      // Optionally implemented for chrome.tabs.remove support
    },
    createWindow(details) {
      // Optionally implemented for chrome.windows.create support
    }
  })

  const browserWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: __dirname + '/logo.ico',
    autoHideMenuBar: true,
    webPreferences: {
      // Same session given to Extensions class
      session: browserSession,
      // Recommended options for loading remote content
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: true,
    },

  })

  // Adds the active tab of the browser
  extensions.addTab(browserWindow.webContents, browserWindow);

  browserWindow.loadURL('https://app.cheweek.com/')
  browserWindow.on('ready-to-show', function () {
    browserWindow.show();
    browserWindow.focus();
  });
}())
