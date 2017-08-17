// @flow
import React, { PropTypes } from "react";
import CalendarMonthList from "./CalendarMonthList";
import type { PickerProps, DateRange } from "./types";

export default class DateRangePicker extends React.PureComponent {
  props: PickerProps<DateRange>;

  isBlocked(day: moment$Moment) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props;
    return isOutsideRange(day);
  }

  isStartDate(day: moment$Moment) {
    const { value } = this.props;

    return (
      value && value.startDate && day.isSame(value.startDate, "day")
    );
  }

  isInSelectedSpan(day: moment$Moment) {
    const { value } = this.props;
    if (value) {
      const { startDate, endDate } = value;
      return (
        startDate && endDate && day.isBetween(startDate, endDate)
      );
    }
    return false;
  }

  isEndDate(day: moment$Moment) {
    const { value } = this.props;
    return value && value.endDate && day.isSame(value.endDate, "day");
  }

  handleDayPress = (day: moment$Moment) => {
    const { value, onValueChange } = this.props;
    let { startDate, endDate } = value;

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

    onValueChange({ startDate, endDate });
  };

  render() {
    const {
      mode,
      value,
      initialMonth,
      numberOfMonths,
      monthFormat
    } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      selectedStart: day => this.isStartDate(day),
      selectedEnd: day => this.isEndDate(day),
      selectedSpan: day => this.isInSelectedSpan(day)
    };

    return (
      <CalendarMonthList
        mode={mode}
        numberOfMonths={numberOfMonths}
        initialMonth={initialMonth}
        onDayPress={this.handleDayPress}
        monthFormat={monthFormat}
        modifiers={modifiers}
        selectedDates={value}
      />
    );
  }
}
