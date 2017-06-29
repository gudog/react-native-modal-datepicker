// @flow
import React from "react";
import { View } from "react-native";
import { ThemeProvider } from "styled-components";
import moment from "moment";

import DateInput from "./DateInput";
import type { ThemeType, PhrasesType } from "./types";
import CalendarModal from "./CalendarModal";
import isDayIncluded from "./utils/isDayIncluded";
import sortDates from "./utils/sortDates";

// const defaultProps = {
//   numberOfMonths: 12,
//   maxNumberOfDates: 100,
//   initialVisibleMonth: () => moment(),
//   onDatesChange() {},
//   dates: [],
//   isOutsideRange: day => day && !day.isSameOrAfter(moment(), "day"),

//   // i18n
//   displayFormat: () => moment.localeData().longDateFormat("L"),
//   monthFormat: "MMMM YYYY",
//   phrases: {
//     selectDate: "Select Date",
//     selectDates: "Select Dates",
//     clearDates: "Clear",
//     save: "Save"
//   },
//   theme: {}
// };

type Props = {
  theme: ThemeType,
  style: StyleSheet,
  numberOfMonths: number,
  maxNumberOfDates: number,
  initialVisibleMonth: Function,
  dates: Array<moment>,
  isOutsideRange: Function,

  onDatesChange: Function,

  // Custom props for main RN components
  modalProps: Object,
  listViewProps: Object,

  // A React element to be used as background
  calendarModalBackground: React.Component<any>,

  // i18n
  // displayFormat: string | Function,
  monthFormat: string,
  phrases: PhrasesType
};

export default class DatesPicker extends React.Component {
  props: Props;

  state: {
    calendarVisible: boolean,
    dates: Array<moment>
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      calendarVisible: false,
      dates: []
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.dates !== this.state.dates) {
      this.setState({ dates: nextProps.dates });
    }
  }

  isBlocked(day: moment) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props;
    return isOutsideRange(day);
  }

  isSelected(day: moment) {
    const { dates } = this.state;
    return isDayIncluded(day, dates);
  }

  handleDayPress = (day: moment) => {
    const { dates } = this.state;
    const { maxNumberOfDates } = this.props;

    if (dates && dates.length >= maxNumberOfDates) {
      // Single date
      this.setState({ dates: [day] });
    } else if (isDayIncluded(day, dates)) {
      // Multiple dates
      const newDates = dates.filter(d => !d.isSame(day));
      this.setState({ dates: newDates });
    } else {
      this.setState({ dates: sortDates([day, ...dates]) });
    }
  };

  handleOnDateInputPress = () => {
    this.setState({ calendarVisible: true });
  };

  handleClosePress = () => {
    this.setState({ calendarVisible: false, dates: this.props.dates });
  };

  handleClearPress = () => {
    this.setState({ dates: [] });
  };

  handleSavePress = () => {
    this.setState({ calendarVisible: false });
    this.props.onDatesChange(this.state.dates);
  };

  renderCalendar() {
    const { dates, calendarVisible } = this.state;
    const {
      initialVisibleMonth,
      numberOfMonths,
      maxNumberOfDates,
      monthFormat,
      phrases,
      modalProps,
      listViewProps,
      calendarModalBackground
    } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      // valid: day => !this.isBlocked(day),
      selected: day => this.isSelected(day)
    };

    return (
      <CalendarModal
        mode="dates"
        dates={dates}
        initialVisibleMonth={initialVisibleMonth}
        maxNumberOfDates={maxNumberOfDates}
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

  render() {
    const { dates, maxNumberOfDates, phrases, style, theme } = this.props;

    return (
      <ThemeProvider theme={{ ...theme }}>
        <View style={style}>
          <DateInput
            onPress={this.handleOnDateInputPress}
            mode="dates"
            dates={dates}
            maxNumberOfDates={maxNumberOfDates}
            phrases={phrases}
          />
          {this.renderCalendar()}
        </View>
      </ThemeProvider>
    );
  }
}
