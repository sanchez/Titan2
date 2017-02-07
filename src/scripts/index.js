function documentReady() {
    require("devtron").install();

    process.env.NODE_PATH = `${__dirname}/packages`;
    require('module').Module._initPaths();
    var logger = require("logger");
    var manager = require("manager");
    manager.loadPackages();
    setTimeout(() => {
        manager.activatePackages();
    }, 0);

    manager.notify("Titan Text Editor", "Document Has Loaded");
    logger.log("Ready");
    require("manager/ipc").send("document", "ready");
}
