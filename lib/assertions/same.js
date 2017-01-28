"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sinon = require('sinon');

(function (same) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) === "object" && (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = same;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return same;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(same);
  }
})(function same(chai, utils) {
  chai.Assertion.addChainableMethod('sameAs', function (expected) {
    var actual = this._obj;
    var actualStringified = (0, _stringify2.default)(actual, null, 2);
    var expectedStringified = (0, _stringify2.default)(expected, null, 2);

    return this.assert(sinon.match(expected).test(actual), "expected " + actualStringified + " to be same as " + expectedStringified, "expected " + actualStringified + " to not be same as " + expectedStringified, expected, actual);
  });

  chai.assert.sameAs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.be.sameAs(exp);
  };

  chai.assert.notSame = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.be.sameAs(exp);
  };
});