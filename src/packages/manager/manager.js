
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
        var promiseBuf = [];
        this.packagesList.forEach((pack) => {
            var p = new Promise((resolve, reject) => {
                try {
                    require(pack);
                    resolve(`Loaded: ${pack}`);
                } catch (err) {
                    reject(`Error Loading: ${pack}`);
                }
            });
            promiseBuf.push(p);
        });
        Promise.all(promiseBuf).then((values) => {
            var logger = require("logger");
            values.forEach((val) => {
                logger.log(val);
            });
        }).catch((err) => {
            require("logger").log(err);
        });
    }
}

if (global.manager === undefined) {
    require("logger").log("Creating Manager");
    global.manager = new Manager();
}

module.exports = global.manager;
