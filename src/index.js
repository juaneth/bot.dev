// app/index.js
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { transformWithEsbuild } = require('vite');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const isDev = process.env.IS_DEV === 'true';

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 720,
        title: "BotDev",
        backgroundColor: "#FFF",
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#292727',
            symbolColor: '#FFF',
            height: 32
        },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    // Open the DevTools.
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        // mainWindow.removeMenu();
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

console.log(`Loading from: ${path.join(__dirname, 'build', 'index.html')}`)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});