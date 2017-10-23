import React from "react";
import { AppRegistry } from "react-native";
import DatesPickerExample from "./storybook/stories/DatesPickerExample";
import CalendarMonthList from "./src/CalendarMonthList";
import AvailabilityCalendar from "./storybook/stories/AvailabilityCalendar";

// const Example = () => <CenterView><DatesPickerExample /></CenterView>;
const Example = () => <AvailabilityCalendar />;

AppRegistry.registerComponent(
  "RNModalDatePickerExample",
  () => Example
);
