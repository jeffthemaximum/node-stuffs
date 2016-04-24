//main script here
var fs = require('fs');
var datetime = require('node-datetime');
var renamer = require('./lib/rename');
var appender = require('./lib/append');
// https://nodejs.org/docs/latest/api/globals.html#globals_dirname
var dirname = __dirname + "/files/original/";

var generateFileName = function(filename) {
    var fileExt = "." + filename.split('.').pop();
    var currDateTime = datetime.create().format('y-m-d_H-S');
    // http://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript
    return(filename.replace(/\.[^/.]+$/, "") + "_EDITED_" + currDateTime + fileExt)
}

var myFileReader = function(err, contents, filename, wholePath, newFileName) {
    
    var newFileName = generateFileName(filename);
    var newWholePath = __dirname + "/files/moved/" + newFileName;
    
    // do file rewrite
    appender.myAppend(contents, dirname, filename, wholePath, newWholePath, newFileName);

    // do file move
    renamer.myRename(wholePath, newWholePath);
}

// open all files in directory
function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }

        filenames.forEach(function(filename) {
            var wholePath = dirname + filename;
            fs.readFile(wholePath, 'utf8', function(err, contents) {
                myFileReader(err, contents, filename, wholePath);
            });
        })
    })
}

// ensure dir is made before files are written and moved
fs.mkdir(__dirname + "/files/moved/", function() {
    readFiles(dirname);
});

