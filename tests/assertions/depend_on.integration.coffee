
describe 'Space.testing', ->

  describe 'Classes', ->

    class TestClass
      Dependencies:
        first: 'first'
        second: 'second'

    describe '#dependOn', ->

      it 'checks if a given class depends on other stuff', ->
        expect(TestClass).to.dependOn {
          first: 'first'
          second: 'second'
        }

      it 'throws nice error if expectations fail', ->
        fail = -> expect(TestClass).to.dependOn first: 'first'
        expect(fail).to.throw Error
