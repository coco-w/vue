
let activeEffect
class ReactiveEffect {
  private _fn: any
  private _scheduler: any
  constructor(fn: any, conf?: { scheduler: any }) {
    this._fn = fn
    this._scheduler = conf?.scheduler
  }

  run() {
    activeEffect = this
    return this._fn()
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
    if (effect._scheduler) {
      effect._scheduler()
    } else {
      effect.run()
    }
  }
}
export function effect(fn: any, conf?: { scheduler: any }) {
  const _effect = new ReactiveEffect(fn, conf)
  _effect.run()

  return _effect.run.bind(_effect)
}