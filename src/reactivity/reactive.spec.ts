import { reactive } from "./reactive"

describe('reactive', () => {
  it('happy path', () => {
    const obj = {a: 1}
    const reactiveObj = reactive(obj)
    expect(reactiveObj).not.toBe(obj)
    expect(reactiveObj.a).toBe(1)
  })
})