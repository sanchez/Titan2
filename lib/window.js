
var Window = function() {
    require("lib/logger").log("Creating the Window");

    const {BrowserWindow} = require("electron");
    this.win = new BrowserWindow({width: 800, height: 600, backgroundColor: global.color.ui.background});
    this.win.loadURL("file://" + __dirname + "/src/index.html");

    this.BrowserWindow = this.win;
}

module.exports = {
    getWindow: function() {
        if (global.window === undefined) {
            global.window = new Window();
        }
        return global.window;
    },

    getColor: function() {
        return global.color;
    },

    setColor: function(color) {
        global.color = color;
    }
}
