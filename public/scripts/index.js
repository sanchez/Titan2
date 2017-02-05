console.log("Hello");

function documentReady() {
    console.log("Document Ready");
    require("devtron").install();
    delay(500);
    const {ipcRenderer} = require("electron");
    ipcRenderer.sendSync("window-onload", true);
    ipcRenderer.on("new-treeview", (event, arg) => {
        console.log("message");
    });
}
