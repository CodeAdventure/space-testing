
{Event, Command} = Space.messaging

# ============== COMMANDS ============== #

class CreateTodoList extends Command
  @type 'CreateTodoList'
  @fields: {
    title: String
    maxItems: Match.Integer
  }

class AddTodo extends Command
  @type 'AddTodo'
  @fields: {
    todoId: String
    title: String
  }

# ============== EVENTS ============== #

class TodoListCreated extends Event
  @type 'TodoListCreated'
  @fields: {
    title: String
    maxItems: Match.Integer
  }

class TodoAdded extends Event
  @type 'TodoAdded'
  @fields: {
    todoId: String
    title: String
  }

class TodoRemoved extends Event
  @type 'TodoRemoved'
  @fields: {
    todoId: String
  }

# ============== EXCEPTIONS =========== #

class TooManyItems extends Error
  name: 'TooManyItems'
  constructor: (maxItems, title) ->
    @message = "Cannot add more than #{maxItems} item to list #{title}"

class TodoList extends Space.eventSourcing.Aggregate

  fields: {
    title: String
    items: [Object]
    maxItems: Match.Integer
  }

  commandMap: -> {

    CreateTodoList: (command) ->
      @record new TodoListCreated @_eventPropsFromCommand(command)

    AddTodo: (command) ->
      throw new TooManyItems(@maxItems, @title) if @items.length + 1 > @maxItems
      @record new TodoAdded @_eventPropsFromCommand(command)

  }

  eventMap: -> {

    TodoListCreated: (event) ->
      @_assignFields(event)
      @items = []

    TodoAdded: (event) -> @items.push { id: event.todoId, title: event.title }
  }

TodoList.registerSnapshotType 'TodoList'

class TodoListRouter extends Space.eventSourcing.AggregateRouter
  aggregate: TodoList
  initializingCommand: CreateTodoList
  routeCommands: [AddTodo]

class TodoListApplication extends Space.Application

  requiredModules: ['Space.eventSourcing']

  configuration: {
    appId: 'TodoListApplication'
  }

  onInitialize: -> @injector.map(TodoListRouter).asSingleton()

  onStart: -> @injector.create(TodoListRouter)

describe 'Space.testing - aggregates', ->

  beforeEach ->
    @id = '123'
    @title = 'testList'
    @maxItems = 1

  it 'can be used to test resulting events', ->

    todoId = '2'
    todoTitle = 'test'

    TodoListApplication.test(TodoList)
    .given(
      new CreateTodoList targetId: @id, title: @title, maxItems: @maxItems
    )
    .when([
      new AddTodo targetId: @id, todoId: todoId, title: todoTitle
    ])
    .expect([
      new TodoListCreated(
        sourceId: @id
        version: 1
        title: @title
        maxItems: @maxItems
        meta: {}
      )
      new TodoAdded(
        sourceId: @id
        version: 2
        todoId: todoId
        title: todoTitle
        meta: {}
      )
    ])

  it 'supports testing errors', ->

    TodoListApplication.test(TodoList)
    .given([
      new TodoListCreated(
        sourceId: @id
        version: 1
        title: @title
        maxItems: @maxItems
      ),
      new TodoAdded(
        sourceId: @id
        version: 2
        todoId: '1'
        title: 'first'
      )
    ])
    .when([
      new AddTodo(targetId: @id, todoId: '2', title: 'second')
    ])
    .expectToFailWith(
      new TooManyItems(@maxItems, @title)
    )
