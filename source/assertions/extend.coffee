chai.use (chai, utils) ->

  chai.Assertion.addMethod 'extend', (baseClass) ->

    input = this._obj

    this.assert(
      input.__super__.constructor == baseClass,
      "expected #{input} to extend baseClass",
      "",
      baseClass,
      input.__super__.constructor
    )
