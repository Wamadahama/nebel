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

		    // Get the webContents object of the main page 
		    // Returns WebContents - The web contents that is focused in this application, otherwise returns null.
		    let wc = webContents.getFocusedWebContents() 

		    // If getFocusedWebContents() fails then try the first element of getAllWebContents 
		    if(wc == null) {
			wc = webContents.getAllWebContents()[0]
		    }

		    // Send the files 
		    wc.send('image-send', files)
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
