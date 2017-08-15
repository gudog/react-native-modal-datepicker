// @flow
import { path } from "ramda";

export default function getModifiersStylesFromTheme(
  modifiers: Set<string>,
  theme: any,
  elementPath: Array<string>
): Object {
  const styles = {};

  Array.from(modifiers).forEach(m => {
    Object.assign(styles, path(elementPath.concat(m), theme));
  });

  return styles;
}
