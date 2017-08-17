// import { AppRegistry } from "react-native";
// import { getStorybookUI, configure } from "@storybook/react-native";

// // import stories
// configure(() => {
//   require("./storybook/stories");
// }, module);

// const StorybookUI = getStorybookUI({ port: 7007, host: "localhost" });
// AppRegistry.registerComponent("RNModalDatePickerExample", () => StorybookUI);


import React from "react";
import { AppRegistry } from "react-native";
import AvailabilityCalendar from "./storybook/stories/AvailabilityCalendar";

// const Example = () => <CenterView><DatesPickerExample /></CenterView>;
const Example = () => <AvailabilityCalendar />;

AppRegistry.registerComponent(
  "RNModalDatePickerExample",
  () => Example
);
