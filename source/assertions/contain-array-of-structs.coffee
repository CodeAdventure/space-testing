chai.use (chai, utils) ->

  chai.Assertion.addMethod 'containArrayOfStructs', (expected) ->

    # Filter out structs we don't need to test for
    actual = _.filter(this._obj, (actualStruct) ->
      _.any(expected, (expectedStruct) ->
        _.isEqual(expectedStruct.toString(), actualStruct.toString())
      )
    )

    untestedProperties = ['timestamp', 'version', 'meta']

    for actualStruct, index in actual
      for key, type of actualStruct.fields()
        if _.isFunction(expected[index][key])
          # Check that the actual value is of the expected type
          check actualStruct[key], expected[index][key]
          # Copy over the actual value, so that they are equal
          expected[index][key] = actualStruct[key]
        else if _.contains(untestedProperties, key)
          delete expected[index][key]
          delete actualStruct[key]

    # Format for error messages
    actualString = JSON.stringify(actual, null, 2)

    for struct, index in expected
      structString = JSON.stringify(struct, null, 2)
      this.assert(
        _.any(actual, (item) -> _.isEqual(item, struct) ),
        "Expected Struct #{struct.toString()} #{structString} not contained in #{actualString}"
      )
