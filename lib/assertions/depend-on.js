"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (dependOn) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) === "object" && (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = dependOn;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return dependOn;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(dependOn);
  }
})(function dependOn(chai, utils) {
  chai.Assertion.addMethod('dependOn', function (dependencies) {
    var actual = this._obj;

    this.assert(utils.type(actual.prototype.dependencies) === 'object', "expected " + actual + " to declare dependencies", "", dependencies, actual.prototype.dependencies);

    var expectedStringified = (0, _stringify2.default)(dependencies, null, 2);
    var actualStringified = (0, _stringify2.default)(actual.prototype.dependencies, null, 2);

    return this.assert(utils.eql(actual.prototype.dependencies, dependencies), "expected " + actual + " to depend on:\n" + expectedStringified + "\nbut was:\n" + actualStringified, "", dependencies, actual.prototype.dependencies);
  });

  chai.assert.dependOn = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.dependOn(exp);
  };
});