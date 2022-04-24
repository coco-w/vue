export const extend = Object.assign

export const isObject = (value) => value !== null && typeof value === 'object'

export const hasChanged = (value, newValue) => !Object.is(value, newValue)

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    console.log(_)
    return c ? c.toUpperCase() : ''
  })
}
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}