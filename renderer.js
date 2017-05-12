// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



const {ipcRenderer} = require('electron')

let constants = require('./constants')

let imageBox   = document.querySelector("#image")
let imageCount = document.querySelector("#count")

let fileList = []
let currentImage = 0

let build_bottom_bar = () => {
    if(fileList.length != 0) {
	imageCount.innerText = `${ currentImage+1 } \\ ${ fileList.length }`

	let fn = fileList[currentImage].split("\\")

	console.log(fn)

	fileName.innerText   =  `${ fn[fn.length-1]}`
    }

}

ipcRenderer.on('image-send', function(event, files) {
    /* Store the files */
    fileList = files

    /* Load the first file */
    imageBox.src = files[0];
    build_bottom_bar()
});


// Handle left and right arrow keys
document.onkeydown = (e) => {

  // Switch the image
  switch (e.keyCode) {
    case constants.keys.rightKey:

      // Move to the next image on the right 
      if(fileList.length != 1) {
	currentImage += 1
      }

      break;
    case constants.keys.leftKey:

      // Move the the next image on the left 
      if(currentImage == 0) { // If its the last image then move it to the end of the list
	    currentImage = fileList.length-1
      } else {

	  // Move it one back
	  if(fileList.length != 1) {
	    currentImage -= 1;
	  }

      }
      break;

  case constants.keys.downKey:
      currentImage = 0
      break;
  case constants.keys.upKey:
      currentImage = fileList.length-1
      break;
  }

    // Keep track of what image we are on 
    
    if (currentImage == fileList.length) {
      currentImage = 0
    }

    // Set image, if there are none then don't do anything 
    if(fileList.length != 0) {
	imageBox.src = fileList[currentImage]
	imageCount.innerText = `${ currentImage+1 } \\ ${ fileList.length }`
        imageCount.altText = "Image failed to load"
    }

    build_bottom_bar()
}
