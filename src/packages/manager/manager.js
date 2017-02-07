/**
 * Manager is an object for controlling all the packages and package interaction for the app
 */
function Manager() {
    this.packagesList = [];
    this.themeList = [];

    // Load all the files/folders in the packages directory
    var fs = require("fs");
    var files = fs.readdirSync("./src/packages");
    if (files) {
        files.forEach((file) => {
            var fileContents = fs.readFileSync(`src/packages/${file}/package.json`);
            var packJSON = JSON.parse(fileContents);
            if (packJSON.type === "package") {
                this.packagesList.push(packJSON.name);
            } else if (packJSON.type === "theme") {
                this.themeList.push(file);
            }
        });
    }

    /**
     * Runs the load function for the packages.
     * This runs when the window is being constructed and initialized
     */
    this.loadPackages =  function() {
        this.packagesList.forEach((pack) => {
            var lib = require(pack);
            if (lib.load !== undefined) {
                logger.log(`Loading: ${pack}`);
                lib.load();
            }
        });
    };

    /**
     * Runs the activate function for the packages.
     * This usually happens after the window has been initialized and created
     */
    this.activatePackages = function() {
        this.packagesList.forEach((pack) => {
            var lib = require(pack);
            if (lib.activate !== undefined) {
                logger.log(`Activating: ${pack}`);
                lib.activate();
            }
        })
    };

    /**
     * Creates and displays a notification to the native desktop screen
     */
    this.notify = require("manager/notif").notify;
}

// This enables the use of a static manager. So that manager is the same for every package that references and uses it
if (global.manager === undefined) {
    logger.log("Creating Manager");
    global.manager = new Manager();
}

// Returns ths manager instance for direct reference from `require("manager")`
module.exports = global.manager;
