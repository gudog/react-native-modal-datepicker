// @flow
import { path } from "ramda";

export default function getDefaultStylesFromTheme(
  theme: any,
  elementPath: Array<string>
): Object {
  return path(elementPath.concat("default"), theme);
}
