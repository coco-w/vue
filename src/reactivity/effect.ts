import { extend } from "../shared"

let activeEffect
class ReactiveEffect {
  private _fn: any
  private scheduler: any
  active: boolean
  deps: any[]
  private onStop: any
  constructor(fn: any, conf?: { scheduler?: any, onStop?:any }) {
    this._fn = fn
    this.active = false
    this.deps = []
    extend(this, conf)
  }

  run() {
    activeEffect = this
    return this._fn()
  }

  stop() {
    if (!this.active) {
      clearupEffect(this)
      this.active = true
      if(this.onStop) {
        this.onStop()
      }
    }
  }
}

function clearupEffect (effect) {
  if(effect.deps) {
    effect.deps.forEach((dep) => {
      dep.delete(effect)
    })
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
  if (activeEffect) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function trigger(target, key) {
  const deps = depsMap.get(target)
  const dep = deps.get(key)

  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
export function effect(fn: any, conf?: { scheduler?: any, onStop?: any }) {
  const _effect = new ReactiveEffect(fn, conf)
  _effect.run()
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

export function stop(fn: any) {
  fn.effect.stop()
}