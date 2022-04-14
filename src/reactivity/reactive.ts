import { reactiveHandler, readonlyHandler, shallowReadOnlyHandler } from "./baseHandler"

export const enum reactiveFlags {
  IS_REACTIVE = '_v_is_reactive',
  IS_READONLY = '_v_is_readonly'
}

export function reactive(raw: any) {
  return createProxyObjcet(raw, reactiveHandler)
}

export function isReactive(value) {
  return !!value[reactiveFlags.IS_REACTIVE]
}

export function readonly(raw: any) {
  return createProxyObjcet(raw, readonlyHandler)
}

export function isReadonly(value) {
  return !!value[reactiveFlags.IS_READONLY]
}

export function shallowReadOnly(raw: any) {
  return createProxyObjcet(raw, shallowReadOnlyHandler)
}

function createProxyObjcet(raw, handle) {
  return new Proxy(raw, handle)
}

export function isProxy(raw) {
  return isReactive(raw) || isReadonly(raw)
}