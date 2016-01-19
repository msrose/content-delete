# Content Delete

Delete contents of a folder, but not the folder.

## Command Line Usage

Given a folder `test`, the command

```
node index.js test
```

removes everything from inside the folder, but leaves the folder itself.

## Usage in Node

```
var condel = require('content-delete');

condel('test', function(err, count) {
  // err.list is an array of any errors that occurred
  // err.successCount is the number of items deleted from the folder
  if(err) {
    return console.log(err);
  }

  // count is the number of items deleted from the folder
  console.log('Deleted', count, 'items');
});
```
