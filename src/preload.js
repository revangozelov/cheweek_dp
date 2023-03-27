// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { app,contextBridge, ipcRenderer } = require('electron');

const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('transferEvent', {
     getList: async () => {
      
        var data  = await fs.readFileSync(path.join(__dirname, 'domain-list.json'), 'utf-8');
           data= data||'[]'
        return JSON.parse(data);
       
    } ,
    refreshList: async (list,callback) => {
      await fs.writeFile(path.join(__dirname, 'domain-list.json'), JSON.stringify(list),callback);
    } ,
    appQuit:  () => {
        ipcRenderer.invoke('quit-app');
    },
    newWindow:  () => {
        ipcRenderer.invoke('new-window');
    } 
})