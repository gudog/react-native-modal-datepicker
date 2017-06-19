// @flow
import React, { createElement } from "react";
import { View } from "react-native";
import { ThemeProvider } from "styled-components";
import moment from "moment";

import DateInput from "./DateInput";
import DatesPicker from "./DatesPicker";
import DateRangePicker from "./DateRangePicker";
import type {
  ThemeType,
  PhrasesType,
  DatePickerMode,
  InputValue
} from "./types";
import isDayIncluded from "./utils/isDayIncluded";
import sortDates from "./utils/sortDates";

type Props = {
  mode: DatePickerMode,
  theme: ThemeType,
  style: StyleSheet,
  numberOfMonths: number,
  maxNumberOfDates: number,
  initialVisibleMonth: Function,
  value: DateInput,
  isOutsideRange: moment$Moment => boolean,
  onValueChange: InputValue => any,

  // Custom props for main RN components
  modalProps: Object,
  listViewProps: Object,

  // A React element to be used as background
  calendarModalBackground: React.Element<*>,

  // i18n
  // displayFormat: string | Function,
  monthFormat: string,
  phrases: PhrasesType
};

export default class ModalDatePicker extends React.Component {
  props: Props;

  state: {
    calendarVisible: boolean,
    value: InputValue
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
    initialVisibleMonth: () => moment(),
    value: [],
    isOutsideRange: day => day && !day.isSameOrAfter(moment(), "day"),
    displayFormat: () => moment.localeData().longDateFormat("L"),
    onValueChange: () => {},
    monthFormat: "MMMM YYYY"
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      calendarVisible: false,
      value: props.mode === "dates" ? [] : null
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleOnDateInputPress = () => {
    this.setState({ calendarVisible: true });
  };

  handleClosePress = () => {
    this.setState({
      calendarVisible: false,
      value: this.props.value
    });
  };

  handleClearPress = () => {
    this.setState({ value: [] });
  };

  handleSavePress = () => {
    this.setState({ calendarVisible: false });
    this.props.onValueChange(this.state.value);
  };

  handleValueChange = (value: InputValue) => {
    this.setState({ value });
  };

  renderPicker() {
    const { value, calendarVisible } = this.state;

    // const Picker = mode === 'dates' ? DatesPicker : DateRangePicker;
    const Picker = this.props.mode === "dates" ? DatesPicker : DateRangePicker;

    return createElement(Picker, {
      ...this.props,
      value,
      calendarVisible,
      onValueChange: this.handleValueChange,
      onClearPress: this.handleClearPress,
      onClosePress: this.handleClosePress,
      onSavePress: this.handleSavePress
    });
  }

  render() {
    const { value, mode, maxNumberOfDates, phrases, style, theme } = this.props;

    return (
      <ThemeProvider theme={{ ...theme }}>
        <View style={style}>
          <DateInput
            onPress={this.handleOnDateInputPress}
            mode={mode}
            value={value}
            maxNumberOfDates={maxNumberOfDates}
            phrases={phrases}
          />
          {this.renderPicker()}
        </View>
      </ThemeProvider>
    );
  }
}
