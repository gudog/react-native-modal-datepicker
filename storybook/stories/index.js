import React from "react";
import moment from "moment";
import { View } from "react-native";
import { storiesOf } from "@kadira/react-native-storybook";
import { withKnobs, number } from "@kadira/storybook-addon-knobs";

import CenterView from "./CenterView";
import SingleDatePickerExample from "./SingleDatePickerExample";
import DatesPickerExample from "./DatesPickerExample";
import DateRangePickerExample from "./DateRangePickerExample";

import { CalendarMonthList, WeekHeader } from "./../../src";

storiesOf("DatesPicker", module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("Single Date", () =>
    <SingleDatePickerExample maxNumberOfDates={number("maxNumberOfDates", 1)} />
  )
  .add("Multiple Dates", () => <DatesPickerExample />);

storiesOf("DateRangePicker", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("default", () => <DateRangePickerExample />);

storiesOf("CalendarMonthList", module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <View style={{ marginTop: 20 }}>{getStory()}</View>)
  .add("default", () =>
    <CalendarMonthList numberOfMonths={number("numberOfMonths", 24)} />
  )
  .add("block all weekends", () =>
    <CalendarMonthList
      modifiers={{
        blocked: day => day.day() == 5 || day.day() == 6
      }}
    />
  )
  .add("date range selected", () =>
    <CalendarMonthList
      modifiers={{
        selectedStart: day => day.isSame(moment(), "day"),
        selectedSpan: day => day.isSame(moment().add(1, "days"), "day"),
        selectedEnd: day => day.isSame(moment().add(2, "days"), "day")
      }}
    />
  )
  .add("with custom theme", () =>
    <CalendarMonthList
      theme={{
        calendarMonthTitle: { color: "red" }
      }}
    />
  );

storiesOf("WeekHeader", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("default", () => <WeekHeader />);
