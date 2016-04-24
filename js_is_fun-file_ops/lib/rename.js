// rename module
var fs = require('fs');

var myRename = function(wholePath, newWholePath) {
    fs.rename(wholePath, newWholePath, function(err) {
        if (err) throw err;
    });
}

exports.myRename = myRename