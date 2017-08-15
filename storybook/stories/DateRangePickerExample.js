import React, { Component } from "react";
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

export default class DateRangePickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  onValueChange = dates => {
    console.log(dates)
    this.setState({ ...dates });
  };

  render() {
    const { startDate, endDate } = this.state;

    return (
      <ModalDatePicker
        mode="dateRange"
        onValueChange={this.onValueChange}
        value={{ startDate, endDate }}
      />
    );
  }
}
