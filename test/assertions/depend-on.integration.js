import chai, {expect} from 'chai';
import dependOn from '../../src/assertions/depend-on.js';
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.use(dependOn);


import test from '../../src/index.js';

describe('dependOn', function() {

  class TestClass {}
  TestClass.prototype.dependencies = {
    first: 'first',
    second: 'second'
  };

  it('checks if a given class depends on other stuff', () => {
    expect(TestClass).to.dependOn({
      first: 'first',
      second: 'second'
    });
  });

  it('throws nice error if expectations fail', () => {
    expect(() => {
      expect(TestClass).to.dependOn({first: 'first'});
    }).to.throw(Error);
  });
});
