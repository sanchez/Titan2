function documentReady() {
    process.env.NODE_PATH = `${__dirname}/packages`;
    require('module').Module._initPaths();
    var logger = require("logger");
    logger.log("Ready");
}
