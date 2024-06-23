const electron = require('electron');
const ContextBridge = electron.contextBridge;
const IPCRenderer = electron.ipcRenderer;


ContextBridge.exposeInMainWorld("brain", {
    quitApp: () => IPCRenderer.send('quit-app'),
    minimiseApp: () => IPCRenderer.send("minimise-app"),
    obfuscateFilePath: () => IPCRenderer.send("get-obfuscation-file-path"),
    obfuscateFile: () => {IPCRenderer.send("obfuscate-file")}
});