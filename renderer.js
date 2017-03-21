// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



const {ipcRenderer} = require('electron')

let imageBox = document.querySelector("#image")

ipcRenderer.on('image-send', function(event, files) {
  imageBox.src = files[0];
});

// ipcRenderer.send('open-image', 'foo')
