const sinon = require('sinon');

(function(same) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = same;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
      return same;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(same);
  }
}(function same(chai, utils) {
  chai.Assertion.addChainableMethod('sameAs', function(expected) {
    const actual = this._obj;
    const actualStringified = JSON.stringify(actual, null, 2);
    const expectedStringified = JSON.stringify(expected, null, 2);

    return this.assert(
      sinon.match(expected).test(actual),
      `expected ${actualStringified} to be same as ${expectedStringified}`,
      `expected ${actualStringified} to not be same as ${expectedStringified}`,
      expected,
      actual
    );
  });

  chai.assert.sameAs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.be.sameAs(exp);
  };

  chai.assert.notSame = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.be.sameAs(exp);
  };
}));
