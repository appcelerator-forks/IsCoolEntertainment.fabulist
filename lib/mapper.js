var Mapper = module.exports = function () {
  this.mapping = {};
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

    dump[property] = that.resolve(data, expression);
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