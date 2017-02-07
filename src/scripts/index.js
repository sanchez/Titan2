function documentReady() {
    process.env.NODE_PATH = `${__dirname}/packages`;
    require('module').Module._initPaths();
    var logger = require("logger");
    var manager = require("manager");
    manager.loadPackages();
    setTimeout(() => {
        manager.activatePackages();
    }, 0);
    logger.log("Ready");
}
