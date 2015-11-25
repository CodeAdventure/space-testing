describe("Space.testing - apis", function() {

  let ApiTest = Space.namespace('ApiTest');

  Space.messaging.Event.extend(ApiTest, 'MyTestEvent', {
    onExtending() { this.type('ApiTest.MyTestEvent'); }
  });

  Space.messaging.Command.extend(ApiTest, 'MyTestCommand', {
    onExtending() { this.type('ApiTest.MyTestCommand'); }
  });

  Space.messaging.Api.extend(ApiTest, 'Api');

  Space.Application.extend(ApiTest, 'MyApp', {
    configuration: { appId: 'ApiTest.MyApp' },
    requiredModules: ['Space.eventSourcing'],
    registerHandler() {
      this.commandBus.registerHandler.apply(this.commandBus, arguments);
    }
  });

  describe("#given", function() {

    it("allows to setup the SUT with a historic commit", function() {
      let myApp = new ApiTest.MyApp();
      let eventSpy = sinon.spy();
      let commandSpy = sinon.spy();
      let event = new ApiTest.MyTestEvent({ sourceId: '123' });
      let command = new ApiTest.MyTestCommand({ targetId: '123' });

      myApp.subscribeTo(ApiTest.MyTestEvent, eventSpy);
      myApp.registerHandler(ApiTest.MyTestCommand, commandSpy);

      ApiTest.MyApp.test(ApiTest.Api, myApp)
      .given([event, command]);

      expect(eventSpy).to.have.been.calledWithMatch(event);
      expect(commandSpy).to.have.been.calledWithMatch(command);
    });

  });

});
