var assert = require('assert');
var fabulist = require('../index');
var fixture = require('./fixtures/label-image-button');
var Ti = require('mockti')();


fabulist.createListView = function (opts) {
  return Ti.UI.createListView(opts);
};

fabulist.createListSection = function (opts) {
  return Ti.UI.createListSection(opts);
};


describe('fabulist', function () {

  it('should build a template for Titanium', function () {
    var tpl = fabulist.createTemplate(fixture);

    assert.equal(tpl.exports.template.childTemplates[0].bindId, 'imageview-0');
  });

  it('should build the associated mapping', function () {
    var tpl = fabulist.createTemplate(fixture);

    assert.equal(tpl.exports.mapper.mapping['imageview-0'].image, 'image');
  });


  it('should create a ListView', function () {
    var listView = fabulist.createFabulistView({
      template: fabulist.createTemplate(fixture)
    });

    assert.equal(listView._type, 'Titanium.UI.ListView');
  });

  it('should not fail to feed', function () {
    var listView = fabulist.createFabulistView({
      template: fabulist.createTemplate(fixture)
    });

    listView.feed({name: 'foobar'});
  });

});
