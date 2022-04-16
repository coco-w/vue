import { hasChanged, isObject } from "../shared"
import { isTracking, trackEffect, triggerEffect } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  private _value: any
  dep: Set<any>
  private _rawValue: any
  _is_ref: boolean
  constructor(value) {
    this._value = convert(value)
    this._rawValue = value
    this.dep = new Set()
    this._is_ref = true
  }
  get value() {
    trackRefValue(this.dep)
    return this._value
  }

  set value(newValue) {
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffect(this.dep)
    }
  }

}

const convert = (value) => isObject(value) ? reactive(value) : value

function trackRefValue(dep) {
  if (isTracking()) {
    trackEffect(dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(value) {
  return !!value._is_ref
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export const proxyRef = (objectWithRefs) => {
  return new Proxy(objectWithRefs, {
    get: (target, key) => {
      return unRef(Reflect.get(target, key))
    },
    set: (target, key, value) => {
      // const res = Reflect.get(target, key)
      if (isRef(target[key])) {
        
        return (target[key].value = value)
      }
      return Reflect.set(target, key, value)
    }
  })
}