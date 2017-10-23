// @flow
import React from "react";
import { View } from "react-native";
import { ThemeProvider } from "styled-components";
import moment from "moment";

import DateInput from "./DateInput";
import CalendarModal from "./CalendarModal";
import type { ModalDatePickerProps, InputValue } from "./types";

export default class ModalDatePicker extends React.Component {
  props: ModalDatePickerProps;
  state: {
    calendarModalVisible: boolean
  };

  static defaultProps = {
    mode: "dates",
    phrases: {
      selectDate: "Select Date",
      selectDates: "Select Dates",
      startDate: "Start Date",
      endDate: "Start Date",
      clear: "Clear",
      save: "Save"
    },
    numberOfMonths: 12,
    maxNumberOfDates: 100,
    initialMonth: moment(),
    value: [],
    isOutsideRange: (day: moment$Moment) => day && !day.isSameOrAfter(moment(), "day"),
    displayFormat: () => moment.localeData().longDateFormat("L"),
    onValueChange: () => {},
    onModalClose: () => {},
    monthFormat: "MMMM YYYY"
  };

  constructor(props: ModalDatePickerProps) {
    super(props);
    this.state = {
      calendarModalVisible: false
    };
  }

  handleOnDateInputPress = () => {
    this.setState({ calendarModalVisible: true });
  };

  handleClosePress = (): void => {
    this.setState({
      calendarModalVisible: false
    });
    this.props.onModalClose();
    return undefined;
  };

  handleSavePress = (value: InputValue): void => {
    this.props.onValueChange(value);
    this.setState({ calendarModalVisible: false });
  };

  render() {
    const {
      value,
      mode,
      maxNumberOfDates,
      phrases,
      theme,
      calendarModalBackground,
      initialMonth,
      isOutsideRange,
      monthFormat,
      numberOfMonths,
      onValueChange,
      onModalShow,
      modifiers
    } = this.props;

    const { calendarModalVisible } = this.state;

    return (
      <ThemeProvider theme={{ ...theme }}>
        <View>
          <DateInput
            onPress={this.handleOnDateInputPress}
            mode={mode}
            value={value}
            maxNumberOfDates={maxNumberOfDates}
            phrases={phrases}
          />
          <CalendarModal
            mode={mode}
            value={value}
            maxNumberOfDates={maxNumberOfDates}
            phrases={phrases}
            theme={theme}
            initialMonth={initialMonth}
            isOutsideRange={isOutsideRange}
            monthFormat={monthFormat}
            numberOfMonths={numberOfMonths}
            calendarModalBackground={calendarModalBackground}
            calendarModalVisible={calendarModalVisible}
            modifiers={modifiers}
            onValueChange={onValueChange}
            onModalShow={onModalShow}
            onClosePress={this.handleClosePress}
          />
        </View>
      </ThemeProvider>
    );
  }
}
