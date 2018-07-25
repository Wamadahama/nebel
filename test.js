const fs = require('fs')
const glob = require('glob')
const path = require('path')
const util = require('util')

// Functions used for archiving 

options = {
    root_folder: "",
    tags:       {},
    ignore: ['.git']
};

function load(root_directory) {
    options["root_folder"] = root_directory

    // Get a listing of directories
    options.tags = walk(options["root_folder"] + "/", {})
    options.tags = Object.keys(options.tags)
	  .filter(val => !options.ignore.includes(val))
	  .reduce((obj, key) => {
	      obj[key] = options.tags[key]
	      return obj
	  }, {})

    console.log(util.inspect(options, false, null))
}

function walk(root, chain) {

    dirs = get_directory_list(root) 
    chain["root_files"] = get_files(root)

    if(dirs.length == 0) {
	return chain;
    }

    dirs.map((dir) => {
	chain[dir] = {}
	chain[dir] = walk(root + "/" +dir, chain[dir])
    })

    return chain
}

function get_directory_list(path) {
    return fs.readdirSync(path).filter(function (file) {
	return fs.statSync(path+'/'+file).isDirectory();
    });
}

// Use the options["root_folder"] to get a listing of the root files 
// Appends the /* for you :-) 
function get_files(path) {
    return glob.sync(path + "/*.*");
}

// Move a file from one location to another 
// Might not need current location
function move_file(filename, current_location, new_loaction) {

}

// "Private" methods 
function get_webm_thumbnail() {
    
}

function get_mp4_thumbnail() {
    
}

//load("C:\\Users\\Elijah\\Documents\\Images");
//load("/home/elijah/Documents")
load("C:\\Users\\eellis\\Desktop\\testdir")
