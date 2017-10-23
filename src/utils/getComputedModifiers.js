// @flow

import type { Modifiers, ComputedModifiers } from "./../types";

export default function getComputedModifiers(
  defaultModifiers: Modifiers,
  modifiers: Modifiers,
  month: moment$Moment
): ComputedModifiers {
  const computedModifiers = new Set();

  if (month) {
    const combinedModifiers = Object.assign(
      {},
      defaultModifiers,
      modifiers
    );

    const keys = Object.keys(combinedModifiers);
    keys.forEach(key => {
      if (combinedModifiers[key](month)) {
        computedModifiers.add(key);
      }
    });
  }
  return computedModifiers;
}
