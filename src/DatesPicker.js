// @flow
import React from "react";
import moment from "moment";

import type { PickerProps, DatesArray } from "./types";
import CalendarModal from "./CalendarModal";
import isDayIncluded from "./utils/isDayIncluded";
import sortDates from "./utils/sortDates";

export default class DatesPicker extends React.PureComponent {
  props: PickerProps<DatesArray>;

  isBlocked(day: moment) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props;
    return isOutsideRange(day);
  }

  isSelected(day: moment) {
    const { value: dates } = this.props;
    return isDayIncluded(day, dates);
  }

  handleDayPress = (day: moment) => {
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
    const { calendarVisible, value, ...restProps } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      selected: day => this.isSelected(day)
    };

    return (
      <CalendarModal
        mode="dates"
        visible={calendarVisible}
        modifiers={modifiers}
        onDayPress={this.handleDayPress}
        selectedDates={value}
        {...restProps}
      />
    );
  }
}
