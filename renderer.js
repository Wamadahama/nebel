// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



const {ipcRenderer} = require('electron')

let constants = require('./constants')

let imageBox = document.querySelector("#image")

let fileList = []
let currentImage = 0

ipcRenderer.on('image-send', function(event, files) {
    /* Store the files */
    fileList = files

    /* Load the first file */
    imageBox.src = files[0];

});

// Handle left and right arrow keys
document.onkeydown = (e) => {
  // Switch the image
  switch (e.keyCode) {
    case constants.keys.rightKey:

      // Keep track of what image we are on
      if (currentImage >= fileList.length) {
        currentImage = 0
      }

      currentImage += 1

      imageBox.src = fileList[currentImage]

      break;
    case constants.keys.leftKey:

      // Keep track of what image we are on
      if (currentImage >= fileList.length) {
        currentImage = 0
      }

      currentImage -= 1

      imageBox.src = fileList[currentImage]
      break;
  }

}
