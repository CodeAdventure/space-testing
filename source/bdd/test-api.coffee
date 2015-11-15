registeredBddApis = []

Space.Module.registerBddApi = (api) -> registeredBddApis.push api

Space.Module.test = Space.Application.test = (systemUnderTest, app=null) ->
  throw new Error 'Cannot test <undefined>' unless systemUnderTest?
  testApi = null
  isModule = isSubclassOf(this, Space.Module)
  isApplication = isSubclassOf(this, Space.Application)

  # Wrap modules into stub app to make dependency injection work
  if !app?
    if isApplication
      app = new this()
    else
      app = Space.Application.create requiredModules: [this.publishedAs]

  for api in registeredBddApis
    returnValue = api(app, systemUnderTest)
    testApi = returnValue if returnValue?

  if not testApi? then throw new Error "No testing API found for #{systemUnderTest}"
  return testApi
