// @flow
import React from "react";
import moment from "moment";
import { ThemeProvider } from "styled-components";

import type { PickerProps, DatesArray, ComputedModifiers } from "./types";
import CalendarMonthList from "./CalendarMonthList";
import isDayIncluded from "./utils/isDayIncluded";
import sortDates from "./utils/sortDates";

type Props = PickerProps<DatesArray>;

export default class DatesPicker extends React.Component {
  props: Props;
  combinedModifiers: Object;

  static defaultProps = {
    enableBlockedDatesSelection: false
  };

  constructor(props: Props) {
    super(props);

    this.combinedModifiers = Object.assign({}, props.modifiers, {
      selected: (day: moment$Moment) => this.isSelected(day)
    });
  }

  isSelected(day: moment$Moment) {
    const { value: dates } = this.props;
    return isDayIncluded(day, dates);
  }

  handleDayPress = (day: moment, modifiers: ComputedModifiers) => {
    const {
      value: dates,
      maxNumberOfDates,
      onDayPress,
      onValueChange,
      enableBlockedDatesSelection
    } = this.props;

    // No matter what, always bubble up the press event
    onDayPress(day, modifiers);

    if (
      modifiers.has("past") ||
      (modifiers.has("blocked") && !enableBlockedDatesSelection)
    ) {
      return;
    }

    if (dates && dates.length >= maxNumberOfDates) {
      // Reached max number of dates
      onValueChange([day]);
    } else if (isDayIncluded(day, dates)) {
      // Multiple dates
      const newDates = dates.filter(d => !d.isSame(day, "day"));
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
