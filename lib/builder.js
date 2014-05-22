var Mapper = require('./mapper');
var Parser = require('./parser');


var Builder = module.exports = function (template) {
  this.template = template;
  this.exports = {};
  this.count = {};
};

Builder.prototype.generateId = function (viewDef) {
  if (!viewDef.type) return 'root';

  var splittedType = viewDef.type.split('.');
  var type = splittedType[splittedType.length - 1].toLowerCase();
  var id = type;

  if (!this.count.hasOwnProperty(type)) this.count[type] = 0;

  id += '-' + this.count[type];
  this.count[type]++;
  return id;
};

Builder.prototype.buildNode = function (node) {
  var that = this;
  var id = that.generateId(node);
  var parser = new Parser(node, id).parse();
  var dump = parser.exports.template;
  
  this.exports.mapper.map(id, parser.exports.mapping);

  if (Array.isArray(node.childTemplates)) {
    dump.childTemplates = node.childTemplates.map(function (child) {
      return that.buildNode(child);
    });
  }

  return dump;
};

Builder.prototype.build = function () {
  this.exports.mapper = new Mapper();
  this.exports.template = this.buildNode(this.template);
  return this;
};