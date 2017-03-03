
var setLeftText = (text) => {
    document.getElementById("status-left").innerHTML = text;
}

var setRightText = (text) => {
    document.getElementById("status-right").innerHTML = text;
}

var setTreeview = (text) => {
    document.getElementById("treeview").innerHTML = text;
}

// TODO: Add css parser and handler code here. Add regex searching or less compilation for global style theme

var loadStyleSheet = (fileLocation) => {
    var fs = require("fs");
    var manager = require("manager");
    var fileContents = fs.readFileSync(`${__dirname}/../${fileLocation}`, 'utf8');
    var loadedLocationName = fileLocation.replace("/", ".");

    var color = manager.color.defaultTheme;
    fileContents = fileContents.replace(/@white/g, color.white);
    fileContents = fileContents.replace(/@black/g, color.black);

    fs.writeFileSync(`${manager.stylesDir}/${loadedLocationName}`, fileContents, 'utf8', '0666', 'w');
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = `file://${manager.stylesDir}/${loadedLocationName}`;
    head.appendChild(style);
}

module.exports = {
    setLeftText,
    setRightText,
    setTreeview,
    loadStyleSheet
}
