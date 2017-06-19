// @flow
import React from "react";
import moment from "moment";
import { ListView } from "react-native";
import { ThemeProvider } from "styled-components";
import CalendarMonth from "./CalendarMonth";
import getCalendarMonthWeeks from "./utils/getCalendarMonthWeeks";

import isMonthIncluded from "./utils/isMonthIncluded";
import type { DatePickerMode, InputValue, ThemeType } from "./types";

type DefaultProps = {
  mode: DatePickerMode,
  initialMonth: moment$Moment,
  numberOfMonths: number,
  blockedDates: Array<moment$Moment>,
  modifiers: Object,
  theme: ThemeType
};

type Props = DefaultProps & {
  selectedDates: InputValue,
  onDayPress: ?(moment$Moment) => any,
  listViewProps?: Object
};

type State = {
  months: Array<any>,
  dataSource: ListView.DataSource
};

export default class CalendarMonthList extends React.Component<
  DefaultProps,
  Props,
  State
> {
  props: Props;
  state: State;

  static defaultProps = {
    mode: "dates",
    initialMonth: moment(),
    numberOfMonths: 24,
    // selectedDates: null,
    blockedDates: [],
    modifiers: {},
    theme: {}
  };

  constructor(props: Props) {
    super(props);

    const { numberOfMonths, initialMonth } = this.props;
    let month = initialMonth.clone().startOf("month");
    const months = [];
    for (let i = 0; i < numberOfMonths; i++) {
      months.push({
        month,
        weeks: getCalendarMonthWeeks(month, false)
      });
      month = month.clone().add(1, "month");
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        // console.log(`rowHasChanged ${r1.month.format('MMMM')}: ${(r1 !== r2)}`)
        return r1 !== r2;
      }
    });

    this.state = {
      months,
      dataSource: dataSource.cloneWithRows(months)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { selectedDates } = this.props;
    const { mode, selectedDates: nextSelectedDates } = nextProps;

    const { months, dataSource } = this.state;
    let newMonths;

    if (mode === "dates") {
      newMonths = months.map(monthRow => {
        const { month } = monthRow;
        if (
          isMonthIncluded(month, nextSelectedDates) ||
          isMonthIncluded(month, selectedDates)
        ) {
          // console.log(`flagging ${month.format('MMMM Y')} as dirty`)
          return Object.assign({}, monthRow); // Change the reference to object
        }
        return monthRow; // keep the same reference
      });
    } else if (mode === "dateRange") {
      // // Tag all the months that need to be re-rendered
      // const { startDate, endDate } = selectedDates;
      // const { nextStartDate, nextEndDate } = nextSelectedDates;
      // newMonths = months.map(monthRow => {
      //   const { month } = monthRow;
      //   if (
      //     month.isSame(nextStartDate, "month") ||
      //     month.isSame(nextEndDate, "month") ||
      //     month.isBetween(nextStartDate, nextEndDate, "month") ||
      //     month.isSame(startDate, "month") ||
      //     month.isSame(endDate, "month") ||
      //     month.isBetween(startDate, endDate, "month")
      //   ) {
      //     // console.log(`flagging ${month.format('MMMM Y')} as dirty`)
      //     return Object.assign({}, monthRow); // Change the reference to object
      //   }
      //   return monthRow; // keep the same reference
      // });
    }

    this.setState({
      months: newMonths,
      dataSource: dataSource.cloneWithRows(newMonths)
    });
  }

  renderRow = (rowData: any) => {
    const { modifiers, onDayPress } = this.props;

    return (
      <CalendarMonth
        modifiers={modifiers}
        weeks={rowData.weeks}
        month={rowData.month}
        onDayPress={onDayPress}
      />
    );
  };

  render() {
    const { listViewProps, theme } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          initialListSize={2}
          pageSize={2}
          scrollRenderAheadDistance={200}
          showsVerticalScrollIndicator={false}
          {...listViewProps}
        />
      </ThemeProvider>
    );
  }
}
