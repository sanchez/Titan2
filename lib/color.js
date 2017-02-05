
module.exports = function(colorDir) {
    var fs = require("fs");
    var uiJSON = JSON.parse(fs.readFileSync(colorDir + "/ui.json"));
    this.ui = uiJSON;
}
