function loadSplits() {
    var split = Split(['#file-viewer', '#file-main'], {
        elementStyle: function(dimension, size, gutterSize) {
            return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
        },
        gutterStyle: function(dimension, gutterSize) {
            return { 'flex-basis': gutterSize + 'px' }
        },
        sizes: [50, 200],
        minSize: 200
    });
}

function documentReady() {
    loadSplits();

    // Sets the packages directory
    process.env.NODE_PATH = `${__dirname}/packages`;
    require("module")._initPaths();

    // Load the package manager
    var manager = require("manager");
    manager.loadPackages();
    setTimeout(() => {
        manager.activatePackages();
    }, 0);

    var logger = require("logger");
    logger.log("Loading Everything");
}