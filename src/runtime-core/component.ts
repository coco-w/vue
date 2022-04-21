import { publicInstanceProxyHandler } from "./componentPublicInstance"

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
  instance.proxy = new Proxy({_: instance}, publicInstanceProxyHandler)

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

