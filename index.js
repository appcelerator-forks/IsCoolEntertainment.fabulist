var Builder = require('./lib/builder');

exports.createTemplate = function (template) {
    return new Builder(template).build();
};

exports.createFabulistView = function (opts) {

};