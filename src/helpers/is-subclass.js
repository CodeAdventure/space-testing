const isSubclassOf = function(sub, sup) {
  let isSubclass = sub.prototype instanceof sup;
  let isSameClass = sub === sup;
  return isSubclass || isSameClass;
};

export default isSubclassOf;
