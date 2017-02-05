
module.exports = {
    activate: function() {
        require("lib/logger").debug("Setting up TreeView");
        var win = require("lib/window").getWindow();
        win.setTreeView("Hello");
    }
}
