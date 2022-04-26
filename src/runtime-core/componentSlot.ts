import { shapeFlags } from "../shared/shapeFlags"

export const initSlot = (instance, children) => {
  if (instance.vnode.shapeFlags & shapeFlags.SLOT_CHILDREN) {
    // instance.slots = 
    normalizeObjectSlots(children, instance.slots)
  }
}


function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    const value = children[key];
    slots[key] = (props) => normalizeSlotValue(value(props));
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value];
}