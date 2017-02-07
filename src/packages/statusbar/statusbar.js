
var setLeftText = (text) => {
    document.getElementById("status-left").innerHTML = text;
}

var setRightText = (text) => {
    document.getElementById("status-right").innerHTML = text;
}

var load = () => {
}

module.exports = {
    load,
    setLeftText,
    setRightText
}
