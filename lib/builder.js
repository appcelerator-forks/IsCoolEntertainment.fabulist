var Parser = require('./parser');

var Builder = module.exports = function (template) {
  this.template = template;
  this.exports = {};
  this.count = {};
};

Builder.prototype.generateId = function (viewDef) {
  // TODO
};


Builder.prototype.build = function () {
  var that = this;
  var exported = {childTemplates: []};

  template.forEach(function (viewDef) {
    var parser = new Parser(viewDef).parse();

    exported.childTemplates.push(parser.exports.template);
  });

  this.exports.template = exported;
  return this;
};