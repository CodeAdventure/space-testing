describe("Space.testing - apis", function() {

  let ApiTest = Space.namespace('ApiTest');

  Space.messaging.Event.extend(ApiTest, 'MySetupEvent', {
    onExtending() { this.type('ApiTest.MySetupEvent'); }
  });

  Space.messaging.Command.extend(ApiTest, 'MySetupCommand', {
    onExtending() { this.type('ApiTest.MySetupCommand'); }
  });

  Space.messaging.Command.extend(ApiTest, 'MyApiCommand', {
    onExtending() { this.type('ApiTest.MyApiCommand'); }
  });

  Space.messaging.Api.extend(ApiTest, 'Api', {
    methods() {
      return [{
        'ApiTest.MyApiCommand'(context, command) {
          this.send(command);
        }
      }];
    }
  });

  Space.Application.extend(ApiTest, 'MyApp', {
    configuration: { appId: 'ApiTest.MyApp' },
    requiredModules: ['Space.eventSourcing'],
    singletons: ['ApiTest.Api'],
    afterInitialize() {
      this.setupCommandHandler = sinon.spy();
      this.apiCommandHandler = sinon.spy();
      this.registerHandler(ApiTest.MySetupCommand, this.setupCommandHandler);
      this.registerHandler(ApiTest.MyApiCommand, this.apiCommandHandler);
    },
    registerHandler() {
      this.commandBus.registerHandler.apply(this.commandBus, arguments);
    }
  });

  describe("#given", function() {

    it("allows to setup the SUT with a historic commit", function() {
      let myApp = new ApiTest.MyApp();
      let eventSpy = sinon.spy();
      let event = new ApiTest.MySetupEvent({ sourceId: '123' });
      let command = new ApiTest.MySetupCommand({ targetId: '123' });

      myApp.subscribeTo(ApiTest.MySetupEvent, eventSpy);

      ApiTest.MyApp.test(ApiTest.Api, myApp)
      .given([event, command]);

      expect(eventSpy).to.have.been.calledWithMatch(event);
      expect(myApp.setupCommandHandler).to.have.been.calledWithMatch(command);
    });

  });

  describe("#send", function() {

    it("allows to send a command to the api", function() {
      let setupEvent = new ApiTest.MySetupEvent({ sourceId: '123' });
      let setupCommand = new ApiTest.MySetupCommand({ targetId: '123' });
      let apiCommand = new ApiTest.MyApiCommand({ targetId: '543' });
      ApiTest.MyApp.test(ApiTest.Api)
      .given([setupEvent, setupCommand])
      .send(apiCommand)
      .expect([apiCommand]);
    });

  });

});
