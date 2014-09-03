var assert = require('assert');
var Mapper = require('../lib/mapper');
var fixture = require('./fixtures/mapping');


describe('Mapper', function () {
  it('should feed the name in text property', function () {
    var mapper = new Mapper();

    Object.keys(fixture).forEach(function (id) {
      mapper.map(id, fixture[id]);
    });

    assert.equal(mapper.feed([{name: 'foobar'}])[0]['label-0'].text, 'foobar');
    assert.equal(mapper.feed([{info: {description : 'bazqux'}}])[0]['label-1'].text, 'bazqux');
    assert.equal(mapper.feed([{current: 1, max: 10 }])[0]['label-2'].text, '1 / 10');
    assert.equal(mapper.feed([{definition: {name: 'foo', content: 'bar'}}])[0]['label-3'].text, 'foo: bar');
    assert.equal(mapper.feed([{name: 'foo'}])[0]['label-4'].text, 'foo foo');
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

  it('should use the uppercase helper', function () {
    var mapper = new Mapper();

    Object.keys(fixture).forEach(function (id) {
      mapper.map(id, fixture[id]);
    });

    mapper.use('uppercase', function (param) {
      return param.toUpperCase();
    });

    assert.equal(mapper.feed([{name: 'foobar'}])[0]['button-0'].title, 'FOOBAR');
  });

});
