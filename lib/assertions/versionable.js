'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNumber = require('lodash/isNumber');
var get = require('lodash/get');

(function (versionable) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === "object" && (typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = versionable;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return versionable;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(versionable);
  }
})(function versionable(chai, utils) {
  var name = 'versionable';

  utils.addProperty(chai.Assertion.prototype, name, function () {
    var actual = this._obj;

    var isVersionable = false;
    if (actual.isVersionable === true) {
      isVersionable = true;
    }
    if (get(actual, 'constructor.isVersionable') === true) {
      isVersionable = true;
    }
    if (isNumber(get(actual, 'schemaVersion'))) {
      isVersionable = true;
    }

    this.assert(isVersionable, 'expected ' + actual + ' to be versionable', 'expected ' + actual + ' to not be versionable');
  });
});