
var load = () => {
    var stop = new Date().getTime() + 2000;
    while (new Date().getTime() < stop);
    require("logger").log("Hello World");
}

var activate = () => {
    require("logger").log("Activating Hello");
}

module.exports = {
    load,
    activate
}
