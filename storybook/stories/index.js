// @flow
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from "react";
import { Text } from "react-native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

// import Button from './Button';
// import CenterView from './CenterView';
// import Welcome from './Welcome';

import moment from "moment";
import CenterView from "./CenterView";
import SingleDatePickerExample from "./SingleDatePickerExample";
import DatesPickerExample from "./DatesPickerExample";
import DateRangePickerExample from "./DateRangePickerExample";
import AvailabilityCalendar from "./AvailabilityCalendar";
import {
  ModalDatePicker,
  CalendarMonthList,
  WeekHeader
} from "./../../src";

import type { ThemeType } from "./../../src/types";

const theme: ThemeType = {
  calendarDay: {
    container: {
      // default modifiers
      selected: {
        backgroundColor: "red"
      },
      // custom modifeirs
      booked: {
        backgroundColor: "orange"
      }
    },
    text: {
      default: {
        color: "black"
      },
      // default modifiers
      selected: {
        color: "white"
      },
      blocked: {
        color: "grey"
      },
      // custom modifeirs
      booked: {
        color: "white"
      },
      past: {
        color: "red"
      }
    }
  },
  calendarModal: {
    container: {
      backgroundColor: "red"
    }
  }
};

const datesList = [
  moment(),
  moment().add(1, "days"),
  moment().add(3, "days"),
  moment().add(9, "days"),
  moment().add(10, "days"),
  moment().add(11, "days"),
  moment().add(12, "days"),
  moment().add(13, "days")
];

const modifiers = {
  selected: day => datesList.some(day2 => day.isSame(day2, "day")),
  booked: day =>
    datesList.some(day2 =>
      day.isSame(day2.clone().add(1, "day"), "day")
    )
};

storiesOf("CalendarMonthList", module)
  .add("AvailabilityCalendar", () => <AvailabilityCalendar />)
  .add("12 months", () =>
    <CalendarMonthList
      numberOfMonths={12}
      theme={theme}
      modifiers={modifiers}
    />
  )
  .add("24 months", () => <CalendarMonthList numberOfMonths={24} />);

storiesOf("ModalDatePicker", module)
  .addDecorator(getStory =>
    <CenterView>
      {getStory()}
    </CenterView>
  )
  // .add("Single Date", () =>
  //   <SingleDatePickerExample maxNumberOfDates={1} />
  // )
  .add("Date Range", () => <DateRangePickerExample />)
  .add("Multiple dates", () => <DatesPickerExample />);
