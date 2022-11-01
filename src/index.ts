declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;
import { app, BrowserWindow, protocol, session } from 'electron';
import Project from './main/project/Project';

import ProjectList from './main/projectList/ProjectList';

import os from 'os';

console.log('aaaaa  ' + os.platform());
// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    frame: true,
    show: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      contextIsolation: true,
      webSecurity: false, // allow files from hard disk to show up
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  new ProjectList();
  new Project();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.whenReady().then(() => {
//   console.log("=========AA1======");
//   protocol.registerFileProtocol('file', (request, callback) => {
//     console.log("=========AA2======");
//     const pathname = request.url.replace('file:///', '');
//     callback(pathname);
//   });
//   session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//     callback({ responseHeaders: Object.assign({
//       ...details.responseHeaders,
//       "Content-Security-Policy": [ "script-src 'self' 'unsafe-eval'; object-src 'self'; img-src 'self' *.unsplash.com" ]
//       }, details.responseHeaders)});
//     });
// });
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
