import { isReadonly, readonly } from "../reactive"

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
  it('nested readonly', () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{bar: 2}]
    }
    const observed = readonly(original)
    expect(isReadonly(observed)).toBe(true)
    expect(isReadonly(observed.nested)).toBe(true)
    expect(isReadonly(observed.array)).toBe(true)
    expect(isReadonly(observed.array[0])).toBe(true)
  })
})