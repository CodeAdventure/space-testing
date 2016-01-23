Changelog
=========

### 3.0.1
- Specific BDD APIs have been extracted from this release, now contained in separate packages following the naming convention `space:testing-{packageName}`
- New chai assertions developed for use in Space BDD APIs to allow
for simple message-based testing using message buses.
  - `matchArrayOfStructs` is used when wanting to test the two arrays match.
  - `containArrayOfStructs` is used when wanting to ensure the array 
  contains the expected structs.
- Adds testing helper `isSubclassOf`.

### 2.0.1
- Declare `space:event-sourcing` and `space:flux` as weak dependencies.

### 2.0.0
- Updates to all latest space packages
- Removes depreciated module testing api (not needed -> use BDD APIs and
  integration tests instead)

### 1.5.0
Adds improved BDD style API for event-sourced applications.

### 1.4.4
Adds dependency on underscore to fix problems.

### 1.4.3
Fixes bug with BDD aggregate style when no commands are applied to the aggregate

### 1.4.2
Heavily improves the API for BDD aggregate testing.

### 1.4.1
Use `.Expect` instead of `.Then` for BDD style aggregate tests.

### 1.4.0
Introduces aggregate tests in nice BDD style like this:
```coffeescript
TestAggregate(@list)
.Given([new TodoAdded sourceId: @id, todoId: '1', title: 'first' ])
.When(new AddTodo id: '2', title: 'second' )
.ThenFailWith(new TooManyItems(@maxItems, @title))
```

### 1.2.1

Adds `to.extend` assertion for Coffeescript classes.

### 1.1.1

Updates munit package name to avoid console warnings

### 1.1.0

Adds `toCreate` assertion for space modules which checks if
a module eagerly creates an instance of a singleton.

### 1.0.0

Initial release
