// append moduler
var fs = require('fs');

var myAppend = function (contents, dirname, filename, wholePath, newWholePath, newFileName, cb) {

    // do json stuff
    try {
        // gets json contents of .json file into memory
        // adds relevant info to the in-memory object
        // the writes in memory object back to file
        // overwriting original contents
        var myJson = JSON.parse(contents)
        myJson['original-path-name'] = dirname + filename;
        myJson['original-file-name'] = filename;
        myJson['new-file-path'] = newWholePath;
        myJson['new-file-name'] = newFileName;
        fs.writeFile(wholePath, JSON.stringify(myJson), function(err) {
            if (err) throw err;
        })

    //do string stuff
    } catch (e) {
        // appends relevant info to the .txt file
        var myStr = "\n" + filename + "\n";
        myStr += dirname + filename + "\n";
        myStr += newWholePath + "\n";
        myStr += newFileName;
        fs.appendFile(wholePath, myStr, function (err) {
            if (err) throw err;
        });
    }
}

exports.myAppend = myAppend