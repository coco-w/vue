const publicPropertiesMap = {
  '$el': (i) => i.vnode.el,
  '$slots': (i) => i.slots
}

export const publicInstanceProxyHandler = {
    get: ({_: instance}, key) => {
      const { setupState, props } = instance

      const hasOwn = (key, val) => Object.prototype.hasOwnProperty.call(val, key)
      if(hasOwn(key, setupState)) {
        return setupState[key]
      }
      if (hasOwn(key, props)) {
        return props[key]
      }
      const publicGetter = publicPropertiesMap[key]
      if (publicGetter) {
        return publicGetter(instance)
      }
    }
  
}