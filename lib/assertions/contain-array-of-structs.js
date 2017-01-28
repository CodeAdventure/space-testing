'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('underscore');
var ObjectEntries = require('lodash/entries');
var ObjectKeys = require('lodash/keys');

(function (containArrayOfStructs) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === "object" && (typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = containArrayOfStructs;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return containArrayOfStructs;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(containArrayOfStructs);
  }
})(function containArrayOfStructs(chai, utils) {
  chai.Assertion.addMethod('containArrayOfStructs', function (expected) {
    var _this = this;

    // Filter out structs we don't need to test for
    var actual = _.filter(this._obj, function (actualStruct) {
      return _.any(expected, function (expectedStruct) {
        return _.isEqual(expectedStruct.toString(), actualStruct.toString());
      });
    });

    var untestedProperties = ['timestamp', 'version', 'meta', 'schemaVersion'];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(ObjectEntries(actual)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
            index = _step$value[0],
            actualStruct = _step$value[1];

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(ObjectKeys(object)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var key = _step3.value;

            if (_.isFunction(expected[index][key])) {
              // Check that the actual value is of the expected type
              check(actualStruct[key], expected[index][key]);
              // Copy over the actual value, so that they are equal
              expected[index][key] = actualStruct[key];
            } else if (_.contains(untestedProperties, key)) {
              delete expected[index][key];
              delete actualStruct[key];
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      // Format for error messages
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var actualString = (0, _stringify2.default)(actual, null, 2);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var struct = _step2.value;

        var structString = (0, _stringify2.default)(struct, null, 2);
        _this.assert(_.any(actual, function (item) {
          _.isEqual(item, struct);
        }), 'Expected Struct ' + struct.toString() + ' ' + structString + ' not contained in ' + actualString);
      };

      for (var _iterator2 = (0, _getIterator3.default)((0, _values2.default)(expected)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });

  chai.assert.containArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.containArrayOfStructs(exp);
  };

  chai.assert.notContainArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.containArrayOfStructs(exp);
  };
});