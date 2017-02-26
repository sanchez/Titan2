
var fileNew = () => {
    alert("New File");
}

var fileOpen = () => {
    alert("Open File");
}

var fileSave = () => {
    alert("Save File");
}

var load = () => {
    var menuManager = require("manager").menu;
    menuManager.createMenuItem("File.New", fileNew, "CmdOrCtrl+N");
    menuManager.createMenuItem("File.Open", fileOpen, "CmdOrCtrl+O");
    menuManager.createMenuItem("File.Save", fileSave, "CmdOrCtrl+S");
}

module.exports = {
    load
}
