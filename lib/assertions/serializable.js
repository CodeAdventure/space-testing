"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = require('lodash/get');

(function (serializable) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) === "object" && (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = serializable;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return serializable;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(serializable);
  }
})(function serializable(chai, utils) {
  var name = 'serializable';

  utils.addProperty(chai.Assertion.prototype, name, function () {
    var actual = this._obj;

    var isSerializable = false;
    if (get(actual, 'constructor.isSerializable') === true) {
      isSerializable = true;
    } else if (get(actual, 'isSerializable') === true) {
      isSerializable = true;
    }

    this.assert(isSerializable, "expected " + actual + " to be serializable", "expected " + actual + " to not be serializable");
  });
});