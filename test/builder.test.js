var assert = require('assert');
var Builder = require('../lib/builder');
var fixture = require('./fixtures/label-image-button');


describe('Builder', function () {

  it('should generate an id by view', function () {
    var builder = new Builder(fixture);

    builder.build();

    assert.equal(builder.exports.template.childTemplates[0].bindId, 'imageview-0');
    assert.equal(builder.exports.template.childTemplates[1].bindId, 'label-0');
    assert.equal(builder.exports.template.childTemplates[2].bindId, 'label-1');
  });

});
