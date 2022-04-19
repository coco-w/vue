import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  path(vnode, container)
}

function path(vnode, container) {
  console.log(vnode, '123')
  if(typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else {
    processComponent(vnode, container)
  }
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render()
  path(subTree, container)
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const element = document.createElement(vnode.type)
  if (typeof vnode.children === 'string') {
    element.textContent = vnode.children  
  } else if (Array.isArray(vnode.children)) {
    mountChildren(vnode, element)
  }
  const { props } = vnode
  if (props) {
    for (const key in props) {
      const val = props[key]
      if (typeof val === 'string') {
        element.setAttribute(key, val)
      } else if (Array.isArray(val)) {
        let str = ''
        val.forEach(value => {
          str += `${value} `
        })
        element.setAttribute(key, str)
      }
    }
  }
  container.append(element)
}

function mountChildren(vnode: any, container: any) {
  vnode.children.forEach(child => {
    path(child, container)
  })
}

