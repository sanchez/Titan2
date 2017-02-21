
function Menu() {
    const {Menu, MenuItem} = require("electron").remote;

    /**
     * The basic menu layout for the menu. This variable gets modified by functions
     * @type {Array}
     */
    this.template = [
        {
            label: "File",
            submenu: [
                {
                    label: "New File",
                    accelerator: "CmdOrCtrl+N"
                },
                {
                    label: "Open File",
                    accelerator: "CmdOrCtrl+O"
                },
                {
                    label: "Save File",
                    accelerator: "CmdOrCtrl+S"
                },
                { type: "separator" },
                { role: "quit" }
            ]
        },
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator"},
                { role: "cut"},
                { role: "copy"},
                { role: "paste"}
            ]
        },
        {
            label: "Packages",
            submenu: []
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "About",
                    click() { alert("Titan Text Editor About Information"); }
                }
            ]
        }
    ];

    this.buildMenu = function () {
        this.menu = Menu.buildFromTemplate(this.template);
        Menu.setApplicationMenu(this.menu);
    };

    this.buildMenu();

    this.getMenu = function(label) {
        var result = undefined;
        this.template.forEach((menu) => {
            if (menu.label === label) {
                result = menu;
            }
        });
        return result;
    }

    this.existsMenu = function(index) {
        var keys = index.split(".");
        var currentMenu = this.template;

        for (var i = 0; i < (keys.length - 1); i++) {
            var found = false;
            for (var j = 0; j < (currentMenu.length); j++) {
                if (keys[i] === currentMenu[j].label) {
                    currentMenu = currentMenu[j].submenu;
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            } else {
                return false;
            }
        }
        for (var i = 0; i < (currentMenu.length); i++) {
            if (keys[keys.length - 1] === currentMenu[i].label) {
                return true;
            }
        }

        return false;
    }

    this.createMenuItem = function(data, clickFun) {
        var keys = data.split(".");
        var currentMenu = this.template;

        for (var i = 0; i < (keys.length); i++) {
            var found = false;
            for (var j = 0; j < (currentMenu.length); j++) {
                if (keys[i] === currentMenu[j].label) {
                    currentMenu = currentMenu[j].submenu;
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            } else {
                var newList = undefined;
                if (i === (keys.length - 1)) {
                    newList = {
                        label: keys[i],
                        click() { clickFun() }
                    }
                } else {
                    newList = {
                        label: keys[i],
                        submenu: []
                    }
                }
                currentMenu.push(newList);
                currentMenu = newList.submenu;
            }
        }
        this.buildMenu();
    }

}

module.exports = Menu;
