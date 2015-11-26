# BDD api for testing Space.messaging.Api

Space.Module.registerBddApi (app, systemUnderTest) ->
  if !Space.messaging? then return
  return new ApiTest(app) if isSubclassOf(systemUnderTest, Space.messaging.Api)

class ApiTest

  constructor: (@_app) ->
    @_app.reset()
    @_app.start()
    @fakeDates = sinon.useFakeTimers('Date')
    @_apiArgs = []
    @_sentCommands = []
    @_expectedCommands = []
    @_commandBus = @_app.injector.get 'Space.messaging.CommandBus'

  given: (data) ->
    # Turn it into an array
    messages = [].concat(data)
    if @_app.injector.getMappingFor('Space.eventSourcing.CommitStore')?
      # The SUT is event-sourcing -> let's simulate a historic commit
      @_commitStore = @_app.injector.get 'Space.eventSourcing.CommitStore'
      # Split messages up into events and commands
      events = []
      commands = []
      for message in messages
        events.push(message) if message instanceof Space.messaging.Event
        commands.push(message) if message instanceof Space.messaging.Command
      changes = events: events, commands: commands
      aggregateId = data[0].sourceId
      version = data[0].version ? 1
      @_commitStore.add changes, aggregateId, version - 1
    else
      # The SUT is just using the messaging api -> send commands and events through
      for message in messages
        @_app.publish(message) if message instanceof Space.messaging.Event
        @_app.send(message) if message instanceof Space.messaging.Command
    return this

  send: (command) ->
    @_apiArgs = [command]
    return this

  call: (@_apiArgs...) -> return this

  expect: (expectedCommands) ->
    if _.isFunction(expectedCommands)
      @_expectedCommands = expectedCommands()
    else
      @_expectedCommands = expectedCommands
    @_test = =>
      @_callApi()
      expect(@_sentCommands).toMatch @_expectedCommands
    @_run()

  expectToFailWith: (expectedError) ->
    @_test = => expect(@_callApi).to.throw expectedError.message
    @_run()

  _run: ->
    try
      @_commandBus.onSend (command) => @_sentCommands.push(command)
      @_test()
    finally
      @_cleanup()

  _cleanup: ->
    @fakeDates.restore()
    @_app.stop()

  _callApi: =>
    if @_apiArgs.length is 1
      Space.messaging.Api.send(@_apiArgs[0]) # it's a command
    else
      Meteor.call.apply(null, @_apiArgs)
