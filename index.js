var Builder = require('./lib/builder');

var fabulist = module.exports = {};

fabulist.createListSection = function (opts) {
  return Ti.UI.createListSection(opts);
};

fabulist.createListView = function (opts) {
  return Ti.UI.createListView(opts);
};

fabulist.createTemplate = function (template) {
    return new Builder(template).build();
};

fabulist.createFabulistView = function (opts) {
  var exported = opts.template.exports;
  
  opts.templates = {template: exported.template};
  opts.defaultItemTemplate = 'template';
  
  var listView = fabulist.createListView(opts);
  var mainSection = fabulist.createListSection();

  listView.feed = function (data) {
    mainSection.setItems(exported.mapper.feed(data));
    return listView;
  };

  listView.setSections([mainSection]);
  return listView;
};