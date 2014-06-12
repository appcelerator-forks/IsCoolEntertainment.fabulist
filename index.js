var Mapper = require('./lib/mapper');
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
  var collection = [];

  listView.addEventListener('itemclick', function (evt) {
    if (evt.itemIndex < collection.length) {
      listView.fireEvent('select', {
        itemIndex: evt.itemIndex,
        item: collection[evt.itemIndex]
      });
    }
  });

  listView.feed = function (dataArray) {
    collection = Array.isArray(dataArray) ? dataArray : [];
    mainSection.setItems(exported.mapper.feed(collection));
    
    return listView;
  };

  listView.update = function (dataArray, animation) {
    dataArray.forEach(function (data, index) {
      mainSection.updateItemAt(index, exported.mapper.feed(data), animation);
    });
    
    return listView;
  };

  listView.updateAt = function (index, data, animation) {
    mainSection.updateItemAt(index, exported.mapper.feed(data), animation);
    
    return listView;
  };

  listView.use = function (name, helper) {
    exported.mapper.use(name, helper);
  };

  listView.setSections([mainSection]);
  return listView;
};

fabulist.use = function (name, helper) {
  Mapper.use(name, helper);
};