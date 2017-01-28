'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _same = require('./same.js');

var _same2 = _interopRequireDefault(_same);

var _serializable = require('./serializable.js');

var _serializable2 = _interopRequireDefault(_serializable);

var _versionable = require('./versionable.js');

var _versionable2 = _interopRequireDefault(_versionable);

var _extend = require('./extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _dependOn = require('./depend-on.js');

var _dependOn2 = _interopRequireDefault(_dependOn);

var _containArrayOfStructs = require('./contain-array-of-structs.js');

var _containArrayOfStructs2 = _interopRequireDefault(_containArrayOfStructs);

var _matchArrayOfStructs = require('./match-array-of-structs.js');

var _matchArrayOfStructs2 = _interopRequireDefault(_matchArrayOfStructs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (spaceChai) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === "object" && (typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === "object") {
    // NodeJS
    module.exports = spaceChai;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return spaceChai;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(spaceChai);
  }
})(function spaceChai(chai) {
  var extensions = [_same2.default, _serializable2.default, _versionable2.default, _extend2.default, _dependOn2.default, _containArrayOfStructs2.default, _matchArrayOfStructs2.default];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(extensions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var extension = _step.value;

      chai.use(extension);
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
});