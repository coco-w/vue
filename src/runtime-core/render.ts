import { shapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  if (vnode.shapeFlags & shapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (vnode.shapeFlags & shapeFlags.STATEFULCOMPONENT) {
    processComponent(vnode, container)
  }
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance, container)
  setupRenderEffect(instance, container, vnode)
}

function setupRenderEffect(instance: any, container, vnode) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)
  patch(subTree, container)
  vnode.el = subTree.el
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const element = document.createElement(vnode.type)
  vnode.el = element
  if (vnode.shapeFlags & shapeFlags.TEXT_CHILDREN) {
    element.textContent = vnode.children
  } else if (vnode.shapeFlags & shapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, element)
  }
  const { props } = vnode
  if (props) {
    for (const key in props) {
      const val = props[key]
      const isOn = value => /^on[A-Z]/.test(value)
      if (isOn(key)) {
        element.addEventListener(key.slice(2).toLocaleLowerCase(), val)
      }
      element.setAttribute(key, val)
    }
  }
  container.append(element)
}

function mountChildren(vnode: any, container: any) {
  vnode.children.forEach(child => {
    patch(child, container)
  })
}

