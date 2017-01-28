"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isSubclassOf = function isSubclassOf(sub, sup) {
  var isSubclass = sub.prototype instanceof sup;
  var isSameClass = sub === sup;
  return isSubclass || isSameClass;
};

exports.default = isSubclassOf;