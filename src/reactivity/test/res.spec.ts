import { effect } from "../effect"
import { reactive } from "../reactive"
import { isRef, proxyRef, ref, unRef } from "../ref"

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
  it('isRef', () => {
    const a = ref(1)
    const user = reactive({
      age: 1
    })
    expect(isRef(a)).toBe(true)
    expect(isRef(1)).toBe(false)
    expect(isRef(user)).toBe(false)
  })

  it('unRef', () => {
    const a = ref(1)
    expect(unRef(a)).toBe(1)
    expect(unRef(1)).toBe(1)
  })
  it('proxyRef', () => {
    const user = {
      age: ref(10),
      name: 'xx'
    }
    const proxyUser = proxyRef(user)
    
    expect(proxyUser.age).toBe(10)
    expect(user.age.value).toBe(10)
    expect(proxyUser.name).toBe('xx')

    proxyUser.age = 20
    expect(proxyUser.age).toBe(20)
    expect(user.age.value).toBe(20)
    
    proxyUser.age = 10
    expect(proxyUser.age).toBe(10)
    expect(user.age.value).toBe(10)
  })
})