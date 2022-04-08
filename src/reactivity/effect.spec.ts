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
})