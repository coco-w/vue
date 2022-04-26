import { shallowReadOnly } from "../reactivity/reactive"
import { initEmit } from "./componentEmit"
import { initProps } from "./componentProps"
import { publicInstanceProxyHandler } from "./componentPublicInstance"
import { initSlot } from "./componentSlot"

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    el: null,
    emit: () => {},
    slots: {}
  }
  component.emit = initEmit.bind(null, component) as any
  return component
}

export function setupComponent(instance, container) {
  initProps(instance, instance.vnode.props)
  initSlot(instance, instance.vnode.children)
  setupStatefulComponent(instance, container)
}

function setupStatefulComponent(instance: any, container: any) {
  const component = instance.type
  instance.proxy = new Proxy({_: instance}, publicInstanceProxyHandler)

  const  {setup} = component
  if (setup) {
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadOnly(instance.props), {
      emit: instance.emit
    })
    setCurrentInstance(null)
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

let currentInstance = null

export const getCurrentInstance = () => {
  return currentInstance
}

const setCurrentInstance = (instance) => {
  currentInstance = instance
}