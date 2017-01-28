import sinon from 'sinon';
import chai, {expect} from 'chai';
import same from '../../src/assertions/same.js';
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.use(same);

describe('same', function() {

  class Test {}
  class Other {}

  it('checks if a given object matches the expectation', () => {
    const input = {
      number: 1,
      string: 'test',
      instance: new Test
    };

    expect(input).to.be.sameAs({
      number: sinon.match.number,
      string: sinon.match.string,
      instance: sinon.match.instanceOf(Test)
    });
  });

  it('throws when it does not match', () => {
    expect(() =>
      expect(null).to.be.sameAs({})
    ).to.throw(Error);
    expect(() =>
      expect({number: 1}).to.be.sameAs({number: sinon.match.string})
    ).to.throw(Error);
  });

  it('can be negated', () => {
    const actual = {number: 1, string: 'test', instance: new Test};
    const expected = {
      number: sinon.match.string,
      string: sinon.match.number,
      instance: sinon.match.instanceOf(Other)
    };
    expect(actual).not.to.be.sameAs(expected);
    expect(actual).to.not.be.sameAs(expected);
  });
});
