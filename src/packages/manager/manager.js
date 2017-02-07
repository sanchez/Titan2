/**
 * Manager is an object for controlling all the packages and package interaction for the app
 */
function Manager() {
    this.packagesList = [];
    this.themeList = [];

    // Load all the files/folders in the packages directory
    var fs = require("fs");
    var files = fs.readdirSync("./src/packages");
    var fileBuf = [];
    if (files) {
        files.forEach((file) => {
            // for each item in the packages directory, create a promise that loads and returns the package information
            var p = new Promise((resolve, reject) => {
                var fileContents = fs.readFileSync(`src/packages/${file}/package.json`);
                var packJSON = JSON.parse(fileContents);
                resolve({
                    file,
                    "type": packJSON.type
                });
            });
            // add the promise to an array for loading later
            fileBuf.push(p);
        });
    }
    // execute all the promises and process the returns
    Promise.all(fileBuf).then((values) => {
        values.forEach((pack) => {
            // sort each package into required arrays for the types of packages contained
            if (pack.type === "package") {
                this.packagesList.push(pack.file);
            } else if (pack.type === "theme") {
                this.themeList.push(pack.file);
            }
        });
    });

    /**
     * Runs the load function for the packages.
     * This runs when the window is being constructed and initialized
     */
    this.loadPackages =  function() {
        this.packagesList.forEach((pack) => {
            var lib = require(pack);
            if (lib.load !== undefined) {
                require("logger").log(`Loading: ${pack}`);
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
                require("logger").log(`Activating: ${pack}`);
                lib.activate();
            }
        })
    };
}

// This enables the use of a static manager. So that manager is the same for every package that references and uses it
if (global.manager === undefined) {
    require("logger").log("Creating Manager");
    global.manager = new Manager();
}

// Returns ths manager instance for direct reference from `require("manager")`
module.exports = global.manager;
