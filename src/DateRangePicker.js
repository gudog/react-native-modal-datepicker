// @flow
import React from "react";
import CalendarMonthList from "./CalendarMonthList";
import type { PickerProps, DateRange, ComputedModifiers } from "./types";

type Props = PickerProps<DateRange>;

export default class DateRangePicker extends React.Component {
  props: Props;
  combinedModifiers: Object;

  constructor(props: Props) {
    super(props);

    this.combinedModifiers = Object.assign({}, props.modifiers, {
      selectedStart: day => this.isStartDate(day),
      selectedEnd: day => this.isEndDate(day),
      selectedSpan: day => this.isInSelectedSpan(day)
    });
  }

  isStartDate(day: moment$Moment) {
    const { value } = this.props;

    return value && value.startDate && day.isSame(value.startDate, "day");
  }

  isInSelectedSpan(day: moment$Moment) {
    const { value } = this.props;
    if (value) {
      const { startDate, endDate } = value;
      return startDate && endDate && day.isBetween(startDate, endDate);
    }
    return false;
  }

  isEndDate(day: moment$Moment) {
    const { value } = this.props;
    return value && value.endDate && day.isSame(value.endDate, "day");
  }

  handleDayPress = (day: moment, modifiers: ComputedModifiers) => {
    // No matter what, always bubble up the press event
    this.props.onDayPress(day, modifiers);

    if (modifiers.has("past") || modifiers.has("blocked")) {
      return;
    }

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

      // Check the new range does not contain any blocked date
      const currDate = startDate.clone();
      while (currDate.add(1, "days").diff(endDate) < 0) {
        if (
          this.combinedModifiers.blocked &&
          this.combinedModifiers.blocked(currDate)
        ) {
          // Use the selected date as startDate to reset date the range
          startDate = day;
          endDate = undefined;
          break;
        }
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

    return (
      <CalendarMonthList
        mode={mode}
        graas
        numberOfMonths={numberOfMonths}
        initialMonth={initialMonth}
        onDayPress={this.handleDayPress}
        monthFormat={monthFormat}
        modifiers={this.combinedModifiers}
        selectedDates={value}
      />
    );
  }
}
