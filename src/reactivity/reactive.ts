import { reactiveHandler, readonlyHandler } from "./baseHandler"
import { tarck, trigger } from "./effect"


export function reactive(raw: any) {
  return createProxyObjcet(raw, reactiveHandler)
}

export function readonly(raw: any) {
  return createProxyObjcet(raw, readonlyHandler)
}

function createProxyObjcet(raw, handle) {
  return new Proxy(raw, handle)
}