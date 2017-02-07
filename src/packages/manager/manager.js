
function Manager() {
    this.packagesList = [];
    this.themeList = [];

    var fs = require("fs");
    var files = fs.readdirSync("./src/packages");
    var fileBuf = [];
    if (files) {
        files.forEach((file) => {
            // fileBuf.push(new Promise((resolve, reject) => {
            //     var packJSON = JSON.parse(await fs.readFile(`src/packages/${file}/package.json`));
            //     console.log("Run boy");
            //     resolve("packJSON.type");
            // }));
            var p = new Promise((resolve, reject) => {
                // var packJSON = JSON.parse(await fs.readFile(`src/packages/${file}/package.json`));
                var fileContents = fs.readFileSync(`src/packages/${file}/package.json`);
                var packJSON = JSON.parse(fileContents);
                resolve({
                    file,
                    "type": packJSON.type
                });
            });
            fileBuf.push(p);
        });
    }
    Promise.all(fileBuf).then((values) => {
        values.forEach((pack) => {
            if (pack.type === "package") {
                this.packagesList.push(pack.file);
            } else if (pack.type === "theme") {
                this.themeList.push(pack.file);
            }
        });
    });

    this.loadPackages =  function() {
        this.packagesList.forEach((pack) => {
            var lib = require(pack);
            if (lib.load !== undefined) {
                require("logger").log(`Loading: ${pack}`);
                lib.load();
            }
        });
    };

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

if (global.manager === undefined) {
    require("logger").log("Creating Manager");
    global.manager = new Manager();
}

module.exports = global.manager;
