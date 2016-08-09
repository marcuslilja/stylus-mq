
var fs = require('fs');
var assert = require('assert');
var stylus = require('stylus');

var input = fs.readFileSync(__dirname + '/test.styl', 'utf8');
var output = fs.readFileSync(__dirname + '/test.css', 'utf8');

describe('stylus-mq', function () {
  it('should preprocess test.styl as expected', function (done) {
    stylus(input)
      .render(function (err, css) {
        if (err) {
          throw err;
        }

        assert.equal(output, css);
        done();
      });
  });
});
