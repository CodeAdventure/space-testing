import chai, {expect} from 'chai';
import versionable from '../../src/assertions/versionable.js';
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.use(versionable);

describe('versionable', function() {

  class MyVersionableClass {}
  MyVersionableClass.isVersionable = true;
  MyVersionableClass.prototype.schemaVersion = 1;
  class MyClass {}


  it('return true if a given class is versionable', () => {
    expect(MyVersionableClass).to.be.versionable;
  });

  it('return false if a given class is versionable', () => {
    expect(MyClass).to.be.not.versionable;
  });

  it('return true if a given instance is versionable', () => {
    expect(new MyVersionableClass()).to.be.versionable;
  });

  it('return false if a given instance is versionable', () => {
    expect(new MyClass()).to.be.not.versionable;
  });

  it('return false if a given argument is not an instance or class', () => {
    expect(new MyClass({})).to.be.not.versionable;
  });
});
