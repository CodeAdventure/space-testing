import chai, {expect} from 'chai';
import serializable from '../../src/assertions/serializable.js';
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.use(serializable);

describe('serializable', function() {

  class MySerializableClass {}
  MySerializableClass.isSerializable = true;
  MySerializableClass.prototype.isSerializable = true;
  class MyClass {}

  it('return true if a given class is serializable', () => {
    expect(MySerializableClass).to.be.serializable;
  });

  it('return false if a given class is serializable', () => {
    expect(MyClass).to.be.not.serializable;
  });

  it('return true if a given instance is serializable', () => {
    expect(new MySerializableClass()).to.be.serializable;
  });

  it('return false if a given instance is serializable', () => {
    expect(new MyClass()).to.be.not.serializable;
  });

  it('return false if a given argument is not an instance or class', () => {
    expect(new MyClass({})).to.be.not.serializable;
  });
});
