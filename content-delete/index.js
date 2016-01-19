'use strict';

let fs = require('fs');
let path = require('path');

/**
 * Deletes everything inside of a directory, not including the directory
 */
function deleteDirectoryContents(dirname, callback) {
  fs.readdir(dirname, function(err, files) {
    let numFilesProcessed = 0;
    let deletedCount = 0;
    let errors = [];

    function addError(message, err) {
      errors.push({ message: message, err: err });
    }

    if(err) {
      addError('Error reading directory ' + dirname, err);
      return callback({ list: errors, successCount: 0 });
    }

    if(files.length === 0) {
      return callback(null, 0);
    }

    files.forEach(function(file) {
      let fullPath = path.join(dirname, file);

      fs.stat(fullPath, function(err, stats) {
        if(err) {
          return finishProcessing(err);
        }

        if(stats.isDirectory()) {
          deleteDirectoryContents(fullPath, function(err, count) {
            if(err) {
              return finishProcessing(err);
            }

            deletedCount += count;

            fs.rmdir(fullPath, finishProcessing);
          });
        } else {
          fs.unlink(fullPath, finishProcessing);
        }

        function finishProcessing(err) {
          numFilesProcessed++;

          if(err) {
            addError('Could not delete item ' + fullPath, err);
          } else {
            deletedCount++;
          }

          if(numFilesProcessed === files.length) {
            if(errors.length === 0) {
              callback(null, deletedCount);
            } else {
              callback({ list: errors, successCount: deletedCount });
            }
          }
        }
      });
    });
  });
}

if(require.main === module) {
  let dir = process.argv[2];

  if(!dir) {
    console.error('Must provide a directory name!');
    process.exit(1);
  }

  deleteDirectoryContents(dir, function(err, count) {
    if(err) {
      console.log('Deleted ' + err.successCount + ' items, but with errors.');
      return console.log('Problem deleting directory contents', err.list);
    }

    console.log('Deleted ' + count + ' items from ' + dir);
  });
}

module.exports = deleteDirectoryContents;
