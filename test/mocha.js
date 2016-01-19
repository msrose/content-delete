var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');

var condel = require('../content-delete');

describe('Delete function', function() {
  beforeEach(function() {
    fs.mkdirSync('test/tmp');
    fs.closeSync(fs.openSync('test/tmp/test1.txt', 'w'));
    fs.mkdirSync('test/tmp/empty');
    fs.mkdirSync('test/tmp/inside');
    fs.closeSync(fs.openSync('test/tmp/inside/test2.txt', 'w'));
  });

  it('deletes everything from the given folder', function(done) {
    condel('test/tmp', function(err, count) {
      assert.equal(fs.readdirSync('test/tmp').length, 0);
      done();
    });
  });

  it('leaves the root folder without deleting it', function(done) {
    condel('test/tmp', function(err, count) {
      assert.equal(fs.existsSync('test/tmp'), true);
      done();
    });
  });

  it('deletes the expected number of items', function(done) {
    condel('test/tmp', function(err, count) {
      assert.equal(count, 4);
      done();
    });
  });

  afterEach(function() {
    rimraf.sync('test/tmp');
  });
});
