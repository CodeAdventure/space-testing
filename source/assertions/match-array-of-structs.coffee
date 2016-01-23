chai.use (chai, utils) ->

  chai.Assertion.addMethod 'matchArrayOfStructs', (expected) ->

    actual = this._obj

    untestedProperties = ['timestamp', 'version', 'meta']

    for struct, index in actual
      for key, type of struct.fields()
        if _.isFunction(expected[index][key])
          # Check that the actual value is of the expected type
          check struct[key], expected[index][key]
          # Copy over the actual value, so that they are equal
          expected[index][key] = struct[key]
        else if _.contains(untestedProperties, key)
          delete expected[index][key]
          delete struct[key]

    # Turn the structs into JSON so that we can output them
    # in readable structure in the tests.
    actualString = JSON.stringify(actual, null, 2)
    expectedString = JSON.stringify(expected, null, 2)

    this.assert(
      _.isEqual(actual, expected),
      "expected #{actualString} to match #{expectedString}",
      "",
      actualString,
      expectedString
    )
