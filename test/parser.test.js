var assert = require('assert');
var Parser = require('../lib/parser');
var fixture = require('./fixtures/label-image-button');


describe('Parser', function () {

  it('should preserve non-expression values', function () {
    var parser = new Parser(fixture[0], 'foobar');

    parser.parse();
    assert.equal(parser.exports.template.properties.width, '50dp');
  });

  it('should bind the given id', function () {
    var parser = new Parser(fixture[0], 'foobar');

    parser.parse();
    assert.equal(parser.exports.template.bindId, 'foobar');

  });

  it('should map the image expression', function () {
    var parser = new Parser(fixture[0], 'foobar');

    parser.parse();
    assert.equal(parser.exports.mapping.image, 'image');
  });

  it('should map the text expression', function () {
    var parser = new Parser(fixture[1], 'foobar');

    parser.parse();
    assert.equal(parser.exports.mapping.text, 'infos.name');
  });

});