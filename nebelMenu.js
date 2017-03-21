const dialog = require('electron').dialog
const {shell} = require('electron')
const {ipcMain} = require('electron')
const {webContents} = require('electron')

let template = [{
    label: 'File',
    submenu: [{
        label: 'Open',
        accelerator: "CmdOrCtrl+O",
        click: function() {
            dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections']

            }, function(files) {
                if (files) {
                  webContents.getFocusedWebContents().send('image-send', files)
                }
            })
        }
    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        aceelerator: "CmdOrCtrl+Q",
        role: "quit"
    }]
}]

module.exports = {
    template: template
}
