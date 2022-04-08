
let activeEffect
class EffectItem {
  private _fn: any
  constructor(fn: any) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    this._fn()
  }
}

const depsMap = new Map()
export function tarck(target, key) {
  let deps = depsMap.get(target)
  if (!deps) {
    deps = new Map()
    depsMap.set(target, deps)
  }

  let dep = deps.get(key)
  
  if(!dep) {
    dep = new Set()
    deps.set(key, dep)
  }

  dep.add(activeEffect)
}

export function trigger(target, key) {
  const deps = depsMap.get(target)
  const dep = deps.get(key)

  for (const effect of dep) {
    effect.run()
  }
}
export function effect(fn: any) {
  const _effect = new EffectItem(fn)
  _effect.run()
}