const isNumber = require('lodash/isNumber');
const get = require('lodash/get');

(function(versionable) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = versionable;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
      return versionable;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(versionable);
  }
}(function versionable(chai, utils) {
  const name = 'versionable';

  utils.addProperty(chai.Assertion.prototype, name, function() {
    const actual = this._obj;

    let isVersionable = false;
    if (actual.isVersionable === true) {isVersionable = true;}
    if (get(actual, 'constructor.isVersionable') === true) {isVersionable = true;}
    if (isNumber(get(actual, 'schemaVersion'))) {isVersionable = true;}

    this.assert(
      isVersionable,
      `expected ${actual} to be versionable`,
      `expected ${actual} to not be versionable`
    );
  });
}));
