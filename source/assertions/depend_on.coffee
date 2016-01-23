
chai.use (chai, utils) ->

  chai.Assertion.addMethod 'dependOn', (dependencies) ->

    input = this._obj

    this.assert(
      utils.type(input.prototype.Dependencies) == 'object',
      "expected #{input} to declare dependencies",
      "",
      dependencies,
      input.prototype.Dependencies
    )

    expected = JSON.stringify dependencies, null, 2
    actual = JSON.stringify input.prototype.Dependencies, null, 2

    this.assert(
      utils.eql(input.prototype.Dependencies, dependencies),
      "expected #{input} to depend on:\n#{expected}\nbut was:\n#{actual}",
      "",
      dependencies,
      input.prototype.Dependencies
    )
