import { isObject } from "../shared"
import { tarck, trigger } from "./effect"
import { reactive, reactiveFlags, readonly } from "./reactive"

const reactiveGet = createGetter()
const reactiveSet = createSetter()
const readonlyGet = createGetter(true)
const readonlySet = (target, key) => {
  console.warn(`${key} 是 readonly`, target)
  return true
}

function createGetter(isReadonly = false) {
  return (target, key) => {
    const res = Reflect.get(target, key)
    if (key === reactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === reactiveFlags.IS_READONLY) {
      return isReadonly
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    if (!isReadonly) {
      tarck(target, key)
    }
    return res
  }
}

function createSetter() {
  return (target, key, value) => {
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}


export const reactiveHandler = {
  get: reactiveGet,
  set: reactiveSet
}

export const readonlyHandler = {
  get: readonlyGet,
  set: readonlySet
}