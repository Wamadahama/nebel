const dialog = require('electron').dialog
let template = [{
    label: 'File',
    submenu: [{
	label: 'Open',
	accelerator: "CmdOrCtrl+O",
	click: function() {
	    dialog.showOpenDialog({
		properties: ['openFile']
	    }, function(files) {
		if (files) console.log(files)
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
