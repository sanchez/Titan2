/**
 * Manager is an object for controlling all the packages and package interaction for the app
 */
function Manager() {
    this.packagesList = [];
    // Create a 5 layered array for different levels of packages. The different levels helps to determine order to load packages.
    for (var i = 0; i < 5; i++) {
        this.packagesList.push([]);
    }
    this.themeList = [];

    // Load all the files/folders in the packages directory
    var fs = require("fs");
    var files = fs.readdirSync("./src/packages");
    if (files) {
        files.forEach((file) => {
            var fileContents = fs.readFileSync(`src/packages/${file}/package.json`);
            var packJSON = JSON.parse(fileContents);
            if (packJSON.type === "package") {
                if (packJSON.level === undefined) {
                    this.packagesList[4].push(packJSON);
                } else {
                    this.packagesList[packJSON.level].push(packJSON);
                }
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
        this.packagesList.forEach((level) => {
            level.forEach((pack) => {
                var lib = require(pack.name);
                if (lib.load !== undefined) {
                    logger.log(`Loading ${pack.name}`);
                    lib.load();
                }
            })
        });
    };

    /**
     * Runs the activate function for the packages.
     * This usually happens after the window has been initialized and created
     */
    this.activatePackages = function() {
        this.packagesList.forEach((level) => {
            level.forEach((pack) => {
                var lib = require(pack.name);
                if (lib.activate !== undefined) {
                    logger.log(`Activating ${pack.name}`);
                    lib.activate();
                }
            })
        });
    };

    /**
     * Creates and displays a notification to the native desktop screen
     */
    this.notify = require("manager/notif").notify;

    var Menu = require("manager/menu");
    this.menu = new Menu();

    // Sets the gui package handler for the manager
    this.gui = require("manager/gui");
}

// This enables the use of a static manager. So that manager is the same for every package that references and uses it
if (global.manager === undefined) {
    logger.log("Creating Manager");
    global.manager = new Manager();
}

// Returns ths manager instance for direct reference from `require("manager")`
module.exports = global.manager;
