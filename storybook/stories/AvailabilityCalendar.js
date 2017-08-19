// @flow
import React, { Component } from "react";
import moment from "moment";
import { DatesPicker } from "./../../src";
import type { ThemeType } from "./../../src/types";

const theme: ThemeType = {
  calendarDay: {
    container: {
      selected: {
        backgroundColor: "#222222"
      },
      blocked: {
        opacity: 1
      },
      booked: {
        backgroundColor: "orange",
        borderRadius: 50
      }
    },
    text: {
      selected: {
        color: "white"
      },
      booked: {
        color: "white"
      }
    }
  }
};

const bookedDates = [
  moment().add(3, "days"),
  moment().add(4, "days"),
  moment().add(5, "days"),
  moment().add(11, "days"),
  moment().add(12, "days"),
  moment().add(16, "days")
];

const unavailableDates = [
  moment().add(7, "days"),
  moment().add(8, "days"),
  moment().add(9, "days"),
  moment().add(13, "days"),
  moment().add(14, "days"),
  moment().add(15, "days")
];

const modifiers = {
  booked: day => bookedDates.some(day2 => day.isSame(day2, "day")),
  blocked: day => unavailableDates.some(day2 => day.isSame(day2, "day"))
};


export default class AvailabilityCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    };
  }

  onDatesChange = dates => {
    this.setState({ dates });
  };

  render() {
    const { dates } = this.state;

    return (
      <DatesPicker
        numberOfMonths={12}
        onValueChange={this.onDatesChange}
        value={dates}
        theme={theme}
        modifiers={modifiers}
      />
    );
  }
}
