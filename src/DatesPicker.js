// @flow
import React from "react";
import moment from "moment";
import Perf from "ReactPerf";

import type { PickerProps, DatesArray } from "./types";
import CalendarMonthList from "./CalendarMonthList";
import isDayIncluded from "./utils/isDayIncluded";
import sortDates from "./utils/sortDates";

function isPast(day: moment$Moment) {
  return day.isBefore(moment(), "day");
}

export default class DatesPicker extends React.Component {
  props: PickerProps<DatesArray>;

  constructor(props) {
    super(props);

    this.combinedModifiers = Object.assign({}, props.modifiers, {
      selected: (day: moment$Moment) => this.isSelected(day)
    });
  }

  isSelected(day: moment$Moment) {
    const { value: dates } = this.props;
    return isDayIncluded(day, dates);
  }

  handleDayPress = (day: moment) => {
    // Perf.start();

    // // Some arbitrary time for metrics
    // setTimeout(() => {
    //   Perf.stop();
    //   Perf.printWasted();
    //   Perf.printExclusive();
    // }, 5000);

    if (isPast(day)) {
      return;
    }

    const {
      value: dates,
      maxNumberOfDates,
      onValueChange
    } = this.props;
    if (dates && dates.length >= maxNumberOfDates) {
      // Reached max number of dates
      onValueChange([day]);
    } else if (isDayIncluded(day, dates)) {
      // Multiple dates
      const newDates = dates.filter(d => !d.isSame(day));
      onValueChange(newDates);
    } else {
      onValueChange(sortDates([day, ...dates]));
    }
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
