var assert = require('assert');
var Mapper = require('../lib/mapper');
var fixture = require('./fixtures/mapping');


describe('Mapper', function () {
  it('should feed the name in text property', function () {
    var mapper = new Mapper();

    Object.keys(fixture).forEach(function (id) {
      mapper.map(id, fixture[id]);
    });

    assert.equal(mapper.feed({name: 'foobar'})['label-0'].text, 'foobar');
  });

  it('should resolve foo.bar=42', function () {
    var mapper = new Mapper();

    assert.equal(mapper.resolve({foo: {bar: 42}}, 'foo.bar'), 42);
  });

  it('should resolve text=foobar', function () {
    var mapper = new Mapper();

    assert.equal(mapper.resolve({text: 'foobar'}, 'text'), 'foobar');
  });

  it('should resolve text=null', function () {
    var mapper = new Mapper();

    assert.equal(mapper.resolve({name: 'foobar'}, 'text'), null);
  });

});
