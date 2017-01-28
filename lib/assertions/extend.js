'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNil = require('lodash/isNil');
var get = require('lodash/get');

(function (extend) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === "object" && (typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = extend;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return extend;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(extend);
  }
})(function extend(chai, utils) {
  chai.Assertion.addChainableMethod('extend', function (baseClass) {
    var actual = this._obj;

    var es6 = get(actual, 'prototype');
    var isExtendingES6 = !isNil(es6) && actual.prototype instanceof baseClass;
    var cs = get(actual, '__super__.constructor');
    var isExtendingCoffeScript = !isNil(cs) && actual.__super__.constructor === baseClass;
    var isExtending = isExtendingES6 || isExtendingCoffeScript;

    return this.assert(isExtending, 'expected ' + actual + ' to extend ' + baseClass, "", baseClass, es6 || cs);
  });

  chai.assert.extend = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.extend(exp);
  };

  chai.assert.notExtend = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.extend(exp);
  };
});