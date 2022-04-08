import { tarck, trigger } from "./effect"

export function reactive(raw: any) {
  return new Proxy(raw, {
    get: (target, key) => {
      const res = Reflect.get(target, key)
      tarck(target, key)
      return res
    },
    set: (target, key, value) => {
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    }
  })
}