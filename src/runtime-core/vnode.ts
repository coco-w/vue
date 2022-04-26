import { shapeFlags } from "../shared/shapeFlags"

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    el: null,
    shapeFlags: getShapeFlags(type)
  }
  if (typeof children === 'string') {
    vnode.shapeFlags |= shapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlags |= shapeFlags.ARRAY_CHILDREN
  }
  if (vnode.shapeFlags & shapeFlags.STATEFULCOMPONENT && typeof children === 'object') {
    vnode.shapeFlags |= shapeFlags.SLOT_CHILDREN
  }
  return vnode
}

function getShapeFlags(type: any) {
  if (typeof type === 'string') {
    return shapeFlags.ELEMENT
  } else  {
    return shapeFlags.STATEFULCOMPONENT
  }
}


export const createTextVnode = (string) => {
  return createVNode(Text, {}, string)
}