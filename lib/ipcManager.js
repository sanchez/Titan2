var ipcMain = require("electron").ipcMain;

ipcMain.on("document", (event, arg) => {
    console.log("Document Loaded");
});

module.exports = ipcMain;