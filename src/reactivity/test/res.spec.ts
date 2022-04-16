import { effect } from "../effect"
import { ref } from "../ref"

describe('ref', () => {
  it('happy path', () => {
    const foo = ref(1)
    expect(foo.value).toBe(1)
  })
  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls ++
      dummy = a.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(dummy).toBe(2)
    expect(calls).toBe(2)
    a.value = 2
    expect(dummy).toBe(2)
    expect(calls).toBe(2)
  })
  it('shold make nested properties reactive', () => {
    const a = ref({
      foo: 1
    })
    let dummy
    effect(() => {
      dummy = a.value.foo
    })
    expect(dummy).toBe(1)
    a.value.foo = 2
    expect(dummy).toBe(2)
  })
})