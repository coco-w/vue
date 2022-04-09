import { effect } from "./effect";
import { reactive } from "./reactive"

describe('effect', () => {
  it('happy path', () => {
    const person = reactive({
      age: 12
    })
    
    let age;
    effect(() => {
      age = person.age
    })
    expect(age).toBe(12)
    person.age ++
    expect(age).toBe(13)
  })

  it('effect should return runner', () => {
    let foo = 10
    const runner = effect(() => {
      foo ++
      return 'foo'
    })
    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })
})