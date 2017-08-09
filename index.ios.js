import React from "react";
import { AppRegistry } from "react-native";
import DatesPickerExample from "./storybook/stories/DatesPickerExample";
import CalendarMonthList from "./src/CalendarMonthList";
import CenterView from "./storybook/stories/CenterView";

// const Example = () => <CenterView><DatesPickerExample /></CenterView>;
const Example = () => <CalendarMonthList numberOfMonths={24} />;

AppRegistry.registerComponent(
  "RNModalDatePickerExample",
  () => Example
);
