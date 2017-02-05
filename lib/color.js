
module.exports = function(colorDir) {
    var fs = require("fs");
    var uiJSON = fs.readFileSync(colorDir + "/ui.json");
    this.ui = uiJSON;
}
