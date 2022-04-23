import { isReadonly, shallowReadOnly } from "../reactive"

describe('shallowReadonly', () => {
  it('happy path', () => {
    const props = shallowReadOnly({n: {foo : 1}})
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })
})