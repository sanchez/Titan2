
var setLeftText = (text) => {
    document.getElementById("status-left").innerHTML = text;
}

var setRightText = (text) => {
    document.getElementById("status-right").innerHTML = text;
}

var setTreeview = (text) => {
    document.getElementById("treeview").innerHTML = text;
}

module.exports = {
    setLeftText,
    setRightText,
    setTreeview
}
