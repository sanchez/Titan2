
module.exports = {
    getPackages: function() {
        var fs = require("fs");
        require("lib/logger").log("Loading Editor Packages");
        var files = fs.readdirSync("app");
        if (files) {
            var packageBuf = [];
            var colorBuf = [];
            files.forEach(function(file) {
                try {
                    var packJSON = JSON.parse(fs.readFileSync("app/" + file + "/package.json"));
                    if (packJSON.type === "package") {
                        var library = require("app/" + file);
                        packageBuf.push(library);
                        require("lib/logger").debug("Found Library: " + file);
                    } else if (packJSON.type === "color") {
                        var Color = require("lib/color");
                        colorBuf.push(new Color("app/" + file));
                        require("lib/logger").debug("Found Color Scheme: " + file);
                    }
                } catch(err) {
                    require("lib/logger").error("Error Loading Package: " + file);
                    console.log(err);
                }
            });
            return [packageBuf, colorBuf];
        } else {
            require("lib/logger").error("Error Loading Needed Packages");
            return;
        }
    },

    loadPackages: function(packages) {
        packages.forEach(function(lib) {
            if (typeof lib.load === "function") {
                lib.load();
            }
        });
        return packages;
    },

    activatePackages: function(packages) {
        packages.forEach(function(lib) {
            if (typeof lib.activate === "function") {
                lib.activate();
            }
        });
        return packages;
    },

    unloadPackages: function(packages) {
        packages.forEach(function(lib) {
            if (typeof lib.unload === "function") {
                lib.unload();
            }
        });
        return packages;
    }
}
