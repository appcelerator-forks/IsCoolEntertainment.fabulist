var BIND_REGXP = /{{.*?}}/;

var Parser = module.exports = function (viewDef, id) {
  this.viewDef = viewDef;
  this.id = id;
  this.exports = {};
};


Parser.prototype.parseLine = function (key) {
  var val = this.viewDef.properties[key];

  if (typeof val === 'string' && val.match(BIND_REGXP)) {
    this.exports.mapping[key] = val;
  } else {
    this.exports.template.properties[key] = val;
  }
};

Parser.prototype.parse = function () {
  var that = this;

  this.exports.template = {
    type: this.viewDef.type,
    bindId: this.id,
    properties: {}
  };

  this.exports.mapping = {};

  Object.keys(this.viewDef.properties).forEach(function (key) {
    that.parseLine(key);
  });

  return this;
};
