var Mapper = require('./mapper');
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
  
  this.exports.template = {childTemplates: []};
  this.exports.mapper = new Mapper();

  this.template.forEach(function (viewDef) {
    var id = that.generateId(viewDef);
    var parser = new Parser(viewDef, id).parse();

    that.exports.template.childTemplates.push(parser.exports.template);
    that.exports.mapper.map(id, parser.exports.mapping);
  });

  return this;
};