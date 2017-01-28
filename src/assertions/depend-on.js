(function(dependOn) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = dependOn;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
      return dependOn;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(dependOn);
  }
}(function dependOn(chai, utils) {
  chai.Assertion.addMethod('dependOn', function(dependencies) {
    const actual = this._obj;

    this.assert(
      utils.type(actual.prototype.dependencies) === 'object',
      `expected ${actual} to declare dependencies`,
      "",
      dependencies,
      actual.prototype.dependencies
    );

    const expectedStringified = JSON.stringify(dependencies, null, 2);
    const actualStringified = JSON.stringify(actual.prototype.dependencies, null, 2);

    return this.assert(
      utils.eql(actual.prototype.dependencies, dependencies),
      `expected ${actual} to depend on:\n${expectedStringified}\nbut was:\n${actualStringified}`,
      ``,
      dependencies,
      actual.prototype.dependencies
    );
  });

  chai.assert.dependOn = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.dependOn(exp);
  };
}));
