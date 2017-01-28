const _ = require('underscore');
const ObjectEntries = require('lodash/entries');
const ObjectKeys = require('lodash/keys');

(function(containArrayOfStructs) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = containArrayOfStructs;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
      return containArrayOfStructs;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(containArrayOfStructs);
  }
}(function containArrayOfStructs(chai, utils) {
  chai.Assertion.addMethod('containArrayOfStructs', function(expected) {

    // Filter out structs we don't need to test for
    const actual = _.filter(this._obj, (actualStruct) =>
      _.any(expected, (expectedStruct) =>
        _.isEqual(expectedStruct.toString(), actualStruct.toString())
      )
    );

    const untestedProperties = ['timestamp', 'version', 'meta', 'schemaVersion'];

    for (let [index, actualStruct] of ObjectEntries(actual)) {
      for (let key of ObjectKeys(object)) {
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
    }

    // Format for error messages
    const actualString = JSON.stringify(actual, null, 2);

    for (let struct of Object.values(expected)) {
      let structString = JSON.stringify(struct, null, 2);
      this.assert(
        _.any(actual, (item) => {
          _.isEqual(item, struct);
        }),
        `Expected Struct ${struct.toString()} ${structString} not contained in ${actualString}`
      );
    }
  });

  chai.assert.containArrayOfStructs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.containArrayOfStructs(exp);
  };

  chai.assert.notContainArrayOfStructs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.containArrayOfStructs(exp);
  };
}));
