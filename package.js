Package.describe({
  summary: 'Helpers for Testing Space Applications and Modules.',
  name: 'space:testing',
  version: '2.0.1',
  git: 'https://github.com/meteor-space/testing.git',
  debugOnly: true
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'coffeescript',
    'underscore',
    'reactive-var',
    'reactive-dict',
    'tracker',
    'ecmascript',
    'space:base@3.1.1',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'source/helpers/is-subclass.coffee',
    'source/classes/depend_on.coffee',
    'source/classes/extend.coffee',
    'source/sinon/to_match.coffee',
    'source/bdd/test-api.coffee',
    'source/bdd/aggregates-bdd-api.coffee',
    'source/bdd/stores-bdd-api.coffee',
    'source/bdd/messaging-api-bdd-api.coffee'
  ]);

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'check',
    'mongo',
    'underscore',
    'ecmascript',
    'space:event-sourcing@2.1.0',
    'space:testing',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'tests/classes/depend_on.integration.coffee',
    'tests/classes/extend.spec.coffee',
    'tests/sinon/to_match.integration.coffee'
  ]);

  api.addFiles([
    'tests/bdd/aggregates-bdd-api.tests.coffee',
    'tests/bdd/api-bdd.tests.js'
  ], 'server');

});
