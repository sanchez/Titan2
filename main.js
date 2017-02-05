'use strict';

process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    var logger = require("lib/logger.js");
    logger.setLogLevel(logger.DEBUG);

    var pack = require("lib/packages.js");
    var packages = pack.loadPackages(pack.getPackages());

    mainWindow.on('closed', function() {
        pack.unloadPackages(packages);
        mainWindow = null;
    });
});
