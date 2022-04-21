export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    // setupState: {}
    el: null
  }
  return component
}

export function setupComponent(instance, container) {
  setupStatefulComponent(instance, container)
}

function setupStatefulComponent(instance: any, container: any) {
  const component = instance.type
  instance.proxy = new Proxy({}, {
    get: (target, key) => {
      if (key === '$el')  {
        return instance.vnode.el
      }
      const { setupState } = instance
      return setupState[key]
    }
  })

  const  {setup} = component
  if (setup) {
    const setupResult = setup()
    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance, setupResult: any) {
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const component = instance.type

  if(component.render) {
    instance.render = component.render
  }
}

