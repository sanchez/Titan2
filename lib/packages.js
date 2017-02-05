
module.exports = {
    getPackages: function() {
        var fs = require("fs");
        require("lib/logger").log("Loading Editor Packages");
        var files = fs.readdirSync("app");
        if (files) {
            var buf = [];
            files.forEach(function(file) {
                try {
                    var library = require("app/" + file);
                    buf.push(library);
                } catch(err) {
                    require("lib/logger").error("Error Loading Package: " + file);
                }
            });
            return buf;
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
