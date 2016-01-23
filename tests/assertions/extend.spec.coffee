
describe 'Space.testing', ->

  describe 'Classes', ->

    class BaseClass
    class TestClass extends BaseClass

    describe '#extend', ->

      it 'checks if a given coffeescript class extends another', ->
        expect(TestClass).to.extend BaseClass

      it 'throws error if expectations fail', ->
        fail = -> expect(TestClass).to.extend {}
        expect(fail).to.throw Error
