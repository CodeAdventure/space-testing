@isSubclassOf = (sub, sup) ->
  isSubclass = sub.prototype instanceof sup
  isSameClass = sub is sup
  return isSubclass || isSameClass
