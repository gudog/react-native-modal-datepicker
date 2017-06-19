import React, { PropTypes } from "react";
import ModalDatePicker from "./ModalDatePicker";

export default class DateRangePicker extends React.Component {
  isBlocked(day) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props;
    return isOutsideRange(day);
  }

  isStartDate(day) {
    return day.isSame(this.state.startDate, "day");
  }

  isInSelectedSpan(day) {
    const { startDate, endDate } = this.state;
    return day.isBetween(startDate, endDate);
  }

  isEndDate(day) {
    return day.isSame(this.state.endDate, "day");
  }

  handleDayPress = day => {
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

  handleOnDateInputPress = () => {
    this.setState({ calendarVisible: true });
  };

  handleClosePress = () => {
    this.setState({
      calendarVisible: false,
      startDate: this.props.startDate,
      endDate: this.props.endDate
    });
  };

  handleClearPress = () => {
    this.setState({
      startDate: null,
      endDate: null
    });
  };

  handleSavePress = () => {
    const { startDate, endDate } = this.state;
    this.setState({ calendarVisible: false });
    this.props.onDatesChange({ startDate, endDate });
  };

  render() {
    const { startDate, endDate } = this.state;
    const {
      initialVisibleMonth,
      numberOfMonths,
      calendarVisible,
      monthFormat,
      phrases,
      modalProps,
      listViewProps,
      calendarModalBackground
    } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      selectedStart: day => this.isStartDate(day),
      selectedEnd: day => this.isEndDate(day),
      selectedSpan: day => this.isInSelectedSpan(day)
    };

    return (
      <CalendarModal
        mode="dateRange"
        startDate={startDate}
        endDate={endDate}
        initialVisibleMonth={initialVisibleMonth}
        numberOfMonths={numberOfMonths}
        monthFormat={monthFormat}
        phrases={phrases}
        modifiers={modifiers}
        visible={calendarVisible}
        // Callbacks
        onDayPress={this.handleDayPress}
        onClearPress={this.handleClearPress}
        onClosePress={this.handleClosePress}
        onSavePress={this.handleSavePress}
        // Custom Props
        modalProps={modalProps}
        listViewProps={listViewProps}
        // Background
        background={calendarModalBackground}
      />
    );
  }
}

// DateRangePicker.propTypes = propTypes;
// DateRangePicker.defaultProps = defaultProps;
