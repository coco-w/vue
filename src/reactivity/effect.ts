import { extend } from "../shared/index"

let activeEffect
let shouldTrack
export class ReactiveEffect {
  private _fn: any
  private scheduler: any
  active = true
  deps: any[]
  private onStop: any
  constructor(fn: any, conf?: { scheduler?: any, onStop?:any }) {
    this._fn = fn
    this.deps = []
    extend(this, conf)
  }

  run() {
    if (!this.active) {
      return this._fn()
    }
    activeEffect = this
    shouldTrack = true
    const res = this._fn()
    activeEffect = undefined
    shouldTrack = false
    return res
    
  }

  stop() {
    if (this.active) {
      clearupEffect(this)
      this.active = false
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
    effect.deps.length = 0
  }
}

const depsMap = new Map()
export function tarck(target, key) {
  if (!isTracking()) return
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
  trackEffect(dep)
}

export function trackEffect(dep) {
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  const deps = depsMap.get(target)
  if (!deps) return
  const dep = deps.get(key)
  triggerEffect(dep)
}

export function triggerEffect(dep) {
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