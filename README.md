# Content Delete

Delete contents of a folder, but not the folder.

Install with NPM

```
npm install content-delete
```

## Command Line Usage

Given a folder `tmp`, the command

```
node content-delete tmp
```

removes everything from inside the folder, but leaves the folder itself.

## Usage in Node

```
var condel = require('content-delete');

condel('tmp', function(err, count) {
  // err.list is an array of any errors that occurred
  // err.successCount is the number of items deleted from the folder
  if(err) {
    return console.log(err);
  }

  // count is the number of items deleted from the folder
  console.log('Deleted', count, 'items');
});
```

## Development

Get the code:

```
git clone https://github.com/msrose/content-delete.git
cd content-delete
npm install
```

Run the tests:

```
npm test
```
