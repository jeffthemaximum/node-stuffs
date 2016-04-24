//main script here
var fs = require('fs');
var datetime = require('node-datetime');
// https://nodejs.org/docs/latest/api/globals.html#globals_dirname
var dirname = __dirname + "/files/original/"

var isJsonString = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var generateFileName = function(filename) {
    var currDateTime = datetime.create().format('y-m-d_H-S');
    // http://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript
    return(filename.replace(/\.[^/.]+$/, "") + "_EDITED_" + currDateTime + ".txt")
}

var myFileReader = function(err, contents, filename, wholePath, newFileName, newWholePath) {

    //do json stuff
    if (isJsonString(contents)) {
        var myJson = JSON.parse(contents)
        myJson['original-path-name'] = dirname;
        myJson['original-file-name'] = filename;
        myJson['new-file-path'] = newWholePath;
        myJson['new-file-name'] = newFileName;
        // likely shouldnt be async
        fs.writeFile(wholePath, JSON.stringify(myJson), function(err) {
            if (err) throw err;
        })

    //do string stuff
    } else {
        var myStr = "\n" + filename + "\n"
        myStr += dirname + "\n"
        myStr += newWholePath + "\n"
        myStr += newFileName
        //write those 4 things to file
        // likely shouldnt be async
        fs.appendFile(wholePath, myStr, function (err) {
            if (err) throw err;
        });

    }

    // do file move
    fs.rename(wholePath, newWholePath, function(err) {
        if (err) throw err;
    })
}

// open all files in directory
// from http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
// where does onError come from????
function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }

        // http://code-maven.com/reading-a-file-with-nodejs
        filenames.forEach(function(filename) {

            var wholePath = dirname + filename;
            var newFileName = generateFileName(filename);
            var newWholePath = __dirname + "/files/moved/" + newFileName;

            fs.readFile(wholePath, 'utf8', function(err, contents) {
                myFileReader(err, contents, filename, wholePath, newFileName, newWholePath);
            });
        })
    })
}

// do this synchronously so it happens first
fs.mkdir(__dirname + "/files/moved/", function() {
    readFiles(dirname);
});
// do this asynchronous so it's fast
