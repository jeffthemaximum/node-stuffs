//main script here
var fs = require('fs');


// professional node book

// fs.open('files/original/anothertext-file.txt', 'r+', function opened(err, fd) {
    
//     console.log("opened");
    
//     if (err) { throw err }
    
//     var readBuffer = new Buffer(1024),
//         bufferOffset = 0,
//         bufferLength = readBuffer.length,
//         filePosition = 0;

//     fs.read(fd,
//             readBuffer,
//             bufferLength,
//             filePosition,
//             function read(err, readBytes) {
//                 if (err) { throw err; }
//                 console.log('just read ' + readBytes + ' bytes');
//                 if (readBytes > 0) {
//                     console.log(readBuffer.slice(0, readBytes));
//                 }
//             });

// });


var isJsonString = function(str) {
    debugger;
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


// https://nodejs.org/docs/latest/api/globals.html#globals_dirname
var dirname = __dirname + "/files/original/"
console.log(dirname);

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

            fs.readFile(wholePath, 'utf8', function(err, contents) {

                if (isJsonString(contents)) {

                    var myJson = JSON.parse(contents)
                    myJson['original-path-name'] = dirname;
                    myJson['original-file-name'] = filename;
                    fs.writeFile(wholePath, JSON.stringify(myJson), function(err) {
                        if (err) throw err;
                    })

                } else {
                    myStr = "\n" + filename + "\n"
                    myStr += dirname + "\n"
                    //write those 4 things to file
                    fs.appendFile(wholePath, myStr, function (err) {
                        if (err) throw err;
                    });

                }


            });
        })
    })
}

readFiles(dirname);
// read file
// write to file
// move to new location