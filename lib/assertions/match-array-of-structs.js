'use strict';

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

(function (matchArrayOfStructs) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === "object" && (typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = matchArrayOfStructs;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return matchArrayOfStructs;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(matchArrayOfStructs);
  }
})(function matchArrayOfStructs(chai, utils) {
  chai.Assertion.addMethod('matchArrayOfStructs', function (expected) {

    var actual = this._obj;

    var untestedProperties = ['timestamp', 'version', 'meta', 'schemaVersion'];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(ObjectEntries(actual)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
            index = _step$value[0],
            struct = _step$value[1];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(ObjectKeys(object)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            if (_.isFunction(expected[index][key])) {
              // Check that the actual value is of the expected type
              check(struct[key], expected[index][key]);
              // Copy over the actual value, so that they are equal
              expected[index][key] = struct[key];
            } else if (_.contains(untestedProperties, key)) {
              delete expected[index][key];
              delete struct[key];
            }
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
      }

      // Turn the structs into JSON so that we can output them
      // in readable structure in the tests.
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
    var expectedString = (0, _stringify2.default)(expected, null, 2);

    return this.assert(_.isEqual(actual, expected), 'expected ' + actualString + ' to match ' + expectedString, "", actualString, expectedString);
  });

  chai.assert.matchArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.matchArrayOfStructs(exp);
  };

  chai.assert.notMatchArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.matchArrayOfStructs(exp);
  };
});