var logger = require("logger");

function Manager() {
    this.packagesList = [];
    for (var i = 0; i < 5; i++) {
        this.packagesList.push([]);
    }
    
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
            }
        });
    }

    this.loadPackages = function() {
        this.packagesList.forEach((level) => {
            level.forEach((pack) => {
                var lib = require(pack.name);
                if (lib.load !== undefined) {
                    logger.log(`Loading ${pack.name}`);
                    lib.load();
                }
            });
        });
    }

    this.activatePackages = function() {
        this.packagesList.forEach((level) => {
            level.forEach((pack) => {
                var lib = require(pack.name);
                if (lib.activate !== undefined) {
                    logger.log(`Activitating ${pack.name}`);
                    lib.activate();
                }
            });
        });
    }

    this.srcDir = `${__dirname}/../..`;
    this.packagesDir = `${__dirname}/..`;
}

if (global.manager === undefined) {
    logger.log("Creating Manager");
    global.manager = new Manager();
}

module.exports = global.manager;