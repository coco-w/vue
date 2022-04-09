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

  it('scheduler', () => {
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler }
    )
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    // should be called on first trigger
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    // should not run yet
    expect(dummy).toBe(1)
    // manually run
    run()
    // should have run
    expect(dummy).toBe(2)
  })
})