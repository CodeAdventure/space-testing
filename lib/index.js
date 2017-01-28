'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spaceChai = exports.assertions = exports.isSubclassOf = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _isSubclass = require('./helpers/is-subclass.js');

var _isSubclass2 = _interopRequireDefault(_isSubclass);

var _same = require('./assertions/same.js');

var _same2 = _interopRequireDefault(_same);

var _serializable = require('./assertions/serializable.js');

var _serializable2 = _interopRequireDefault(_serializable);

var _versionable = require('./assertions/versionable.js');

var _versionable2 = _interopRequireDefault(_versionable);

var _extend = require('./assertions/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _dependOn = require('./assertions/depend-on.js');

var _dependOn2 = _interopRequireDefault(_dependOn);

var _containArrayOfStructs = require('./assertions/contain-array-of-structs.js');

var _containArrayOfStructs2 = _interopRequireDefault(_containArrayOfStructs);

var _matchArrayOfStructs = require('./assertions/match-array-of-structs.js');

var _matchArrayOfStructs2 = _interopRequireDefault(_matchArrayOfStructs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assertions = {};
assertions.chai = {
  same: _same2.default,
  serializable: _serializable2.default,
  versionable: _versionable2.default,
  extend: _extend2.default,
  dependOn: _dependOn2.default,
  containArrayOfStructs: _containArrayOfStructs2.default,
  matchArrayOfStructs: _matchArrayOfStructs2.default
};

var spaceChai = function spaceChai(chai) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _values2.default)(assertions.chai)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var assertion = _step.value;

      chai.use(assertion);
    }
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
};

exports.isSubclassOf = _isSubclass2.default;
exports.assertions = assertions;
exports.spaceChai = spaceChai;