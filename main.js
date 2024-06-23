const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const App = electron.app;
const Menu = electron.Menu;
const path = require('path');
const IPCMain = electron.ipcMain;
const Dialog = electron.dialog;
const Obfuscator = require("javascript-obfuscator");
const fs = require('fs');

let win;
function createWindow() {
    win = new BrowserWindow({
        title: "Electron App",
        width: 970,
        height: 670,
        resizable: false,
        center: true,
        maximizable: false,
        frame: false,
        transparent: true,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.loadFile(path.join(__dirname, "views/home/index.html"));
    Menu.setApplicationMenu(null);
    win.on('closed', () => {App.quit()});
}

IPCMain.on('quit-app', () => {App.quit()});

IPCMain.on('minimise-app', () => {win.minimize()});

App.whenReady().then(createWindow);

App.on('activate', function() {if(BrowserWindow.getAllWindows().length == 0) {createWindow()}});

App.on('window-all-closed', () => {App.quit});


// Obfuscation of JavScript Code Files:
let obfuscationData;
let filePath;

IPCMain.on("get-obfuscation-file-path", function() {
    Dialog.showOpenDialog({properties: ['openFile']})
    .then((result) => {
        filePath = result['filePaths'][0];
        if(filePath.substring(filePath.length-3).toLowerCase() == ".js") {
            fs.readFile(filePath, 'utf8', (err, data) => { if(err) console.log(err); else obfuscationData = data;});
        } else {
            Dialog.showErrorBox("No JS File", "Choose a JavaScript Source File");
        }
    }).catch(err => console.log(err));
});

IPCMain.on("obfuscate-file", function() {
    if(obfuscationData !== undefined) {
        fs.writeFile(filePath.substring(0, filePath.length-3) + "_obfuscated.js", 
        Obfuscator.obfuscate(obfuscationData).getObfuscatedCode(), 
        err => {if(err) console.log(err); 
                else Dialog.showMessageBox({type: "info", buttons: ['OK'],
                                            title: "Operation Success",
                                            message: "Obfuscated File Successfully!"});});
    } else {
        Dialog.showErrorBox("No File Chosen", "No File Chosen to obfuscate");
    }
});
