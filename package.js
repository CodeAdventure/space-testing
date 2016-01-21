Package.describe({
  summary: 'Helpers for Testing Space Applications and Modules.',
  name: 'space:testing',
  version: '3.0.1',
  git: 'https://github.com/meteor-space/testing.git',
  debugOnly: true
});

Package.onUse(function(api) {

  api.versionsFrom('1.0');

  api.use([
    'coffeescript',
    'underscore',
    'reactive-var',
    'reactive-dict',
    'tracker',
    'check',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'source/helpers/is-subclass.coffee',
    'source/assertions/depend_on.coffee',
    'source/assertions/extend.coffee',
    'source/assertions/to_match.coffee',
    'source/assertions/match-array-of-structs.coffee',
    'source/assertions/contain-array-of-structs.coffee'
  ]);

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'check',
    'mongo',
    'underscore',
    'space:testing',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'tests/assertions/depend_on.integration.coffee',
    'tests/assertions/extend.spec.coffee',
    'tests/assertions/to_match.integration.coffee'
  ]);

});
