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
    var logger = require("lib/logger.js");
    logger.setLogLevel(logger.DEBUG);

    var pack = require("lib/packages.js");
    var colors;
    var packages;
    [packages, colors] = pack.getPackages();
    require("lib/window").setColor(colors[0]);
    pack.loadPackages(packages);

    window = require("lib/window").getWindow();

    window.BrowserWindow.on('ready-to-show', function() {
        pack.activatePackages(packages);
    });

    window.BrowserWindow.on('closed', function() {
        pack.unloadPackages(packages);
        window.BrowserWindow = null;
    });
});
