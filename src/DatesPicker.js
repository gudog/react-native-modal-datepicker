// @flow
import React from "react";
import moment from "moment";
import { ThemeProvider } from "styled-components";

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
      monthFormat,
      theme
    } = this.props;

    return (
      <ThemeProvider theme={{ ...theme }}>
        <CalendarMonthList
          mode={mode}
          numberOfMonths={numberOfMonths}
          initialMonth={initialMonth}
          onDayPress={this.handleDayPress}
          monthFormat={monthFormat}
          modifiers={this.combinedModifiers}
          selectedDates={value}
        />
      </ThemeProvider>
    );
  }
}
