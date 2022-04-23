import { effect } from "../effect"
import { isReactive, isReadonly, reactive, readonly, isProxy } from "../reactive"

describe('reactive', () => {
  it('happy path', () => {
    const obj = {a: 1}
    const reactiveObj = reactive(obj)
    expect(reactiveObj).not.toBe(obj)
    expect(reactiveObj.a).toBe(1)
    expect(isReactive(reactiveObj)).toBe(true)
    expect(isProxy(reactiveObj)).toBe(true)
    expect(isReactive(obj)).toBe(false)
  })

  it('nested reactive', () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{bar: 2}]
    }
    const observed = reactive(original)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
