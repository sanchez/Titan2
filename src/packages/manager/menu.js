
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
            submenu: [
                {
                    label: "Manager",
                    accelerator: "CmdOrCtrl+M",
                    click() { alert("Manager"); }
                }
            ]
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

    /**
     * Builds the physical menu from the array template
     */
    this.buildMenu = function () {
        this.menu = Menu.buildFromTemplate(this.template);
        Menu.setApplicationMenu(this.menu);
    };

    // Makes sure that the menu has been built before people make changes
    this.buildMenu();

    /**
     * Returns the menu from matching label
     * @param  {string} label label to search for and return
     * @return {JSON}       Matching Menu item
     */
    this.getMenu = function(label) {
        var result = undefined;
        this.template.forEach((menu) => {
            if (menu.label === label) {
                result = menu;
            }
        });
        return result;
    }

    /**
     * Checks if the menu and submenu exists
     * @param  {string} index The lookup string to search for menu
     * @return {boolean}       Returns true if the menu exists, otherwise false
     */
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

    /**
     * Creates the menu and submenus. This uses a recursive addition
     * @param  {string} data     The string location of the menu to be added
     * @param  {function} clickFun The function to be called when the menu item is clicked
     * @param  {string} accelerator The accelerator for the menu item, can be undefined
     */
    this.createMenuItem = function(data, clickFun, accelerator) {
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
                        accelerator,
                        click() { clickFun() }
                    }
                } else {
                    newList = {
                        label: keys[i],
                        accelerator,
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

// Returns the menu object on export
module.exports = Menu;
