
var loadDirectory = function(dir, htmlCache, depth) {
    var fs = require("fs");
    fs.readdirSync(dir).forEach((file) => {
        if (fs.lstatSync(`${dir}/${file}`).isDirectory()) {
            htmlCache.cache += "<details><summary>"
            for (var i = 0; i < depth -1; i++) {
                htmlCache.cache += "&emsp;";
            }
            htmlCache.cache += `${file}</summary>`;
            loadDirectory(`${dir}/${file}`, htmlCache, depth + 1);
            htmlCache.cache += "</details>";
        } else {
            htmlCache.cache += "<div>";
            for (var i = 0; i < depth; i++) {
                htmlCache.cache += "&emsp;";
            }
            htmlCache.cache += `${file}</div>`;
        }
    });
}

var load = function() {
    var dir = require("manager").workingDir;
    var htmlCache = { cache: `<details><summary>${dir}</summary>` };

    var fs = require("fs");
    loadDirectory(dir, htmlCache, 1);

    htmlCache.cache += "</details>";
    console.log(htmlCache);

    document.getElementsByClassName("project-files")[0].innerHTML += htmlCache.cache;
}

module.exports = {
    load
}