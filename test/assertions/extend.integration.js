import chai, {expect} from 'chai';
import extend from '../../src/assertions/extend.js';
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.use(extend);

describe('extend', function() {

  class BaseClass {}
  class TestClass extends BaseClass {}

  it('checks if a given ES6 class extends another', () => {
    expect(TestClass).to.extend(BaseClass);
  });

  it('checks if a given CoffeScript class extends another', () => {
    class FakeCoffeeScriptClass {}
    // fake CS inheritance structure
    FakeCoffeeScriptClass.__super__ = {
      constructor: BaseClass
    };

    expect(FakeCoffeeScriptClass).to.extend(BaseClass);
  });

  it('throws error if expectations fail', () => {
    const fail = () => expect(TestClass).to.extend({});
    expect(fail).to.throw(Error);
  });
});
