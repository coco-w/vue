import { camelize, toHandlerKey } from "../shared/index"

export const initEmit = (instance, event, ...args) => {
  const { props } = instance
  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}