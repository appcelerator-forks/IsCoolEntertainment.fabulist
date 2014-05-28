var VAR_REGXP = /\{\{(.+)\}\}/;
var HELPER_REGXP = /\{\{\#([^ ]+)( ([^ ]+))?\}\}/

var Mapper = module.exports = function () {
  this.mapping = {};
};

Mapper.prototype.helpers = {};

Mapper.use = function (name, helper) {
  Mapper.prototype.helpers[name] = helper;
};

Mapper.prototype.use = function (name, helper) {
  this.helpers[name] = helper;
};

Mapper.prototype.map = function (id, mapping) {
  this.mapping[id] = mapping;
};

Mapper.prototype.resolve = function (data, expression) {
  var levels = expression.split('.');
  var ctx = data;

  levels.every(function (level) {
    if (!ctx.hasOwnProperty(level)) {
      ctx = null;
      return false;
    }

    ctx = ctx[level];
    return true;
  });

  return ctx;
};

Mapper.prototype.feedId = function (id, data) {
  var that = this;
  var dump = {};
  var mapping = this.mapping[id];

  Object.keys(mapping).forEach(function (property) {
    var expression = mapping[property];
    var helperMatch = expression.match(HELPER_REGXP);
    var helperParam = null;
    var varMatch = expression.match(VAR_REGXP);

    if (helperMatch && that.helpers.hasOwnProperty(helperMatch[1])) {
      if (helperMatch[3]) {
        helperParam = that.resolve(data, helperMatch[3]);
      }

      dump[property] = that.helpers[helperMatch[1]](helperParam, data);
    } else if (varMatch) {
      dump[property] = that.resolve(data, varMatch[1]);
    }
    
  });

  return dump;
};

Mapper.prototype.feed = function (datas) {
  var that = this;
  
  return datas.map(function (data) {
    var dump = {};

    Object.keys(that.mapping).forEach(function (id) {
      dump[id] = that.feedId(id, data);
    });

    return dump;
  });
};