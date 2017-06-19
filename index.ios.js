import { AppRegistry } from "react-native";
import { getStorybookUI, configure } from "@storybook/react-native";

// import stories
configure(() => {
  require("./storybook/stories");
}, module);

const StorybookUI = getStorybookUI({ port: 7007, host: "localhost" });
AppRegistry.registerComponent("RNModalDatePickerExample", () => StorybookUI);
