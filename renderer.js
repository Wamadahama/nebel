// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



const {ipcRenderer} = require('electron')

let constants = require('./constants')

let imageBox   = document.querySelector("#image")
let imageCount = document.querySelector("#count")

let fileList = []
let currentImage = 0

ipcRenderer.on('image-send', function(event, files) {
    /* Store the files */
    fileList = files

    /* Load the first file */
    imageBox.src = files[0];
    imageCount.innerText = `${ currentImage+1 } \\ ${ fileList.length }`

});

// Handle left and right arrow keys
document.onkeydown = (e) => {

  // Switch the image
  switch (e.keyCode) {
    case constants.keys.rightKey:

      if(fileList.length != 1) {
	currentImage += 1
      }

      break;
    case constants.keys.leftKey:

      if(currentImage == 0) {
	  console.log(currentImage)
	    currentImage = fileList.length-1
      } else {

	  if(fileList.length != 1) {
	    currentImage -= 1;
	  }

      }
      break;
  }

    // Keep track of what image we are on 
    
    if (currentImage == fileList.length) {
      currentImage = 0
    }

    // Set image 
    imageBox.src = fileList[currentImage]
    imageCount.innerText = `${ currentImage+1 } \\ ${ fileList.length }`
}
