const get = require('lodash/get');

(function(serializable) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = serializable;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
      return serializable;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(serializable);
  }
}(function serializable(chai, utils) {
  const name = 'serializable';

  utils.addProperty(chai.Assertion.prototype, name, function() {
    const actual = this._obj;

    let isSerializable = false;
    if (get(actual, 'constructor.isSerializable') === true) {
      isSerializable = true;
    } else if (get(actual, 'isSerializable') === true) {
      isSerializable = true;
    }

    this.assert(
      isSerializable,
      `expected ${actual} to be serializable`,
      `expected ${actual} to not be serializable`
    );
  });
}));
