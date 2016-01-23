
describe 'Space.testing', ->

  describe '#toMatch', ->

    class Test
    class Other

    it 'checks if a given object matches the expectation', ->

      input =
        number: 1
        string: 'test'
        instance: new Test

      expect(input).toMatch
        number: sinon.match.number
        string: sinon.match.string
        instance: sinon.match.instanceOf(Test)

    it 'throws when it does not match', ->

      expect(-> expect(null).toMatch {}).to.throw Error
      expect(-> expect(number: 1).toMatch number: sinon.match.string).to.throw Error

    it 'can be negated', ->

      expect(number: 1, string: 'test', instance: new Test).not.toMatch
        number: sinon.match.string
        string: sinon.match.number
        instance: sinon.match.instanceOf(Other)
