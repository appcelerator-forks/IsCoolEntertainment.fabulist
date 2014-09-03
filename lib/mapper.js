var VAR_REGXP = /{{(.+?)}}/;
var GLOBAL_VAR_REGXP = /{{(.+?)}}/g;
var HELPER_REGXP = /{{#([^ ]+)(?: ([^ ]+))?}}/

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
    var varMatch = expression.match(GLOBAL_VAR_REGXP);

    if (helperMatch && that.helpers.hasOwnProperty(helperMatch[1])) {
      if (helperMatch[2]) {
        helperParam = that.resolve(data, helperMatch[2]);
      }

      dump[property] = that.helpers[helperMatch[1]](helperParam, data);
    } else if (varMatch) {
      varMatch.forEach(function(string) {
          expression = expression.replace(string, that.resolve(data, string.match(VAR_REGXP)[1]));
      });
      dump[property] = expression;
    }
    
  });

  return dump;
};

Mapper.prototype.feed = function (dataArray) {
  var that = this;
  
  return dataArray.map(function (data, index) {
    return that.feedOne(index, data);
  });
};

Mapper.prototype.feedOne = function (index, data) {
  var that = this;
  var dump = {};

  Object.keys(this.mapping).forEach(function (id) {
    dump[id] = that.feedId(id, data);
  });

  return dump;
};
