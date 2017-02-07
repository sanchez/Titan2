'use strict';

process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const electron = require('electron');
const app = electron.app;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    window = require("lib/window").getWindow();

    window.BrowserWindow.on("closed", () => {
        window.BrowserWindow = null;
    })
})
