// @flow

import moment from "moment";
import type { Modifiers } from "./../types";

export default function getDefaultModifiers(): Modifiers {
  const today = moment();
  return {
    past: day => day && day.isBefore(today, "day"),
    today: day => day && day.isSame(today, "day")
  };
}
