import React, { Component } from "react";
import moment from "moment";
import { ModalDatePicker } from "./../../src";

const theme = {
  dateInputContainer: {
    backgroundColor: "blue"
  },
  dateInputText: {
    color: "red"
  },
  calendarDayTodayMarker: {
    color: "blue"
  },
  calendarDaySelectedTodayMarker: {
    color: "red"
  }
};

const blockedDates = [
  moment().add(7, "days"),
  moment().add(8, "days"),
  moment().add(9, "days"),
  moment().add(13, "days"),
  moment().add(14, "days"),
  moment().add(15, "days")
];

const modifiers = {
  blocked: day => blockedDates.some(day2 => day.isSame(day2, "day"))
};

export default class DateRangePickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  onValueChange = dates => {
    this.setState({ ...dates });
  };

  render() {
    const { startDate, endDate } = this.state;

    return (
      <ModalDatePicker
        mode="dateRange"
        onValueChange={this.onValueChange}
        value={{ startDate, endDate }}
        modifiers={modifiers}
        theme={theme}
      />
    );
  }
}
