
module.exports = {
    load: function() {
        require("lib/logger").debug("Loaded Package");
    }

    unload: function() {
        require("lib/logger").debug("UnLoaded Package");
    }
}
