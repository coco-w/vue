import { isReactive, isReadonly, reactive, readonly } from "../reactive"

describe('reactive', () => {
  it('happy path', () => {
    const obj = {a: 1}
    const reactiveObj = reactive(obj)
    expect(reactiveObj).not.toBe(obj)
    expect(reactiveObj.a).toBe(1)
    expect(isReactive(reactiveObj)).toBe(true)
    expect(isReactive(obj)).toBe(false)
  })
})

describe('readonly', () => {
  it('happy path', () => {
    const obj = {a: 1}
    const readonlyObj = readonly(obj)
    expect(readonlyObj).not.toBe(obj)
    expect(readonlyObj.a).toBe(1)
    expect(isReadonly(readonlyObj)).toBe(true)
    expect(isReadonly(obj)).toBe(false)
  })

  it('call set should warn', () => {
    console.warn = jest.fn()
    const obj = {a: 1}
    const readonlyObj = readonly(obj)
    readonlyObj.a = 2
    expect(console.warn).toBeCalled()
  })
})