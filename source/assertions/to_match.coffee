chai.use (chai, utils) ->

  chai.Assertion.addMethod 'toMatch', (expectation) ->

    input = this._obj

    actual = JSON.stringify input, null, 2
    expected = JSON.stringify expectation, null, 2

    this.assert(
      sinon.match(expectation).test(input),
      "expected #{actual} to match #{expected}",
      "",
      expectation,
      input
    )
