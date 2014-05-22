var Parser = require('./parser');

var Builder = module.exports = function (template) {
  this.template = template;
  this.exports = {};
  this.count = {};
};

Builder.prototype.generateId = function (viewDef) {
  var splittedType = viewDef.type.split('.');
  var type = splittedType[splittedType.length - 1].toLowerCase();
  var id = type;

  if (!this.count.hasOwnProperty(type)) this.count[type] = 0;

  id += '-' + this.count[type];
  this.count[type]++;
  return id;
};


Builder.prototype.build = function () {
  var that = this;
  var exported = {childTemplates: []};

  this.template.forEach(function (viewDef) {
    var parser = new Parser(viewDef, that.generateId(viewDef)).parse();
    exported.childTemplates.push(parser.exports.template);
  });

  this.exports.template = exported;
  return this;
};