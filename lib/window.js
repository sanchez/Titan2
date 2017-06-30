
var Window = function() {
    const {BrowserWindow} = require("electron");
    this.win = new BrowserWindow({width: 1024, height: 800, webPreferences: {
        experimentalFeatures: true
    }});
    this.win.loadURL("file://" + __dirname + "/../src/index.html");
    this.contents = this.win.webContents;
    this.contents.toggleDevTools();

    this.BrowserWindow = this.win;

    this.ipc = require("lib/ipcManager");
}

module.exports = {
    getWindow: () => {
        if (global.window === undefined) {
            global.window = new Window();
        }
        return global.window;
    }
}