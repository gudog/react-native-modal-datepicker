// @flow
import React, { PropTypes } from "react";
import CalendarModal from "./CalendarModal";
import type { PickerProps, DateRange } from "./types";

type State = {
  startDate: moment$Moment | null,
  endDate: moment$Moment | null,
  calendarVisible: boolean
};


export default class DateRangePicker extends React.Component {
  props: PickerProps<DateRange>;
  state: State = {
    startDate: null,
    endDate: null,
    calendarVisible: false
  };

  isBlocked(day: moment$Moment) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props;
    return isOutsideRange(day);
  }

  isStartDate(day: moment$Moment) {
    return (
      this.state.startDate && day.isSame(this.state.startDate, "day")
    );
  }

  isInSelectedSpan(day: moment$Moment) {
    const { startDate, endDate } = this.state;
    return startDate && endDate && day.isBetween(startDate, endDate);
  }

  isEndDate(day: moment$Moment) {
    return (
      this.state.endDate && day.isSame(this.state.endDate, "day")
    );
  }

  handleDayPress = (day: moment$Moment) => {
    let { startDate, endDate } = this.state;

    if (!startDate && !endDate) {
      // Nothing was selected
      startDate = day;
    } else if (startDate && !endDate) {
      // Only startDate date was selected

      // If the selected day is before the startDate, we use the previous
      // date as endDate
      if (day.isBefore(startDate)) {
        endDate = startDate;
        startDate = day;
      } else if (day.isAfter(startDate)) {
        endDate = day;
      }
    } else if (startDate && endDate) {
      // Both startDate and endDate were selected

      if (day.isBetween(startDate, endDate)) {
        // If the selected day is between the selected range,
        // we adjust the selected range

        // TODO: change this to find the closest date
        endDate = day;
      } else {
        // Otherwise, reset the date range and set the day as new startDate
        startDate = day;
        endDate = null;
      }
    }

    this.setState({ startDate, endDate });
  };

  render() {
    const { startDate, endDate } = this.state;
    const { calendarVisible, value, ...restProps } = this.props;
    
    const modifiers = {
      blocked: day => this.isBlocked(day),
      selectedStart: day => this.isStartDate(day),
      selectedEnd: day => this.isEndDate(day),
      selectedSpan: day => this.isInSelectedSpan(day)
    };

    return (
      <CalendarModal
        mode="dateRange"
        visible={calendarVisible}
        modifiers={modifiers}
        onDayPress={this.handleDayPress}
        selectedDates={{ startDate, endDate }}
        {...restProps}
      />
    );
  }
}

