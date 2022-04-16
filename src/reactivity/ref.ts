import { hasChanged, isObject } from "../shared"
import { isTracking, trackEffect, triggerEffect } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  private _value: any
  dep: Set<any>
  private _rawValue: any

  constructor(value) {
    this._value = convert(value)
    this._rawValue = value
    this.dep = new Set()
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