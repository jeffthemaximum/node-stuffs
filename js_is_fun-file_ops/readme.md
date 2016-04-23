#JS is fun - file ops
The basic task is to read files from a directory, append 4 pieces of information to each file
* The original name of the file
* The original file path
* The new name of the file
* The new file path

The original files are located in `files/original`, you need to move the into `files/moved`, each file should be renamed. The new name of the file should be `[original file name]_edited_[year-month-day_hour-second]` with it's original extension.

```
// The hour timestamp should be in 24 hour notation (14:00 = 2:00pm)
// Rename Example:
	my-text-file.txt -> my-text-file_EDITED_2015-05-31_14-22.txt 

// Old Location:
	files/original/my-text-file.txt

// New Location
	files/moved/my-text-file_EDITED_2015-05-31_14-22.txt
```

For text files, append the four pieces of information to the text file on new lines below the original contents of the file. For json files, add new properties to the json file with the four pieces of information.

Feel free to use any existing open source javascript libraries.

## Bonus tasks
1. your script should be able to run from with command line with `npm start` 
2. your script should use a module to rename files, the module shoule be in `lib/rename.js`
3. extra brownie points for writing another module to append the file information