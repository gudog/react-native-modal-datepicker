// @flow
import React from "react";
import moment from "moment";
import { VirtualizedList } from "react-native";
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
        key: i,
        month,
        weeks: getCalendarMonthWeeks(month, false)
      });
      month = month.clone().add(1, "month");
    }

    this.state = {
      months
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
      months: newMonths
    });
  }

  renderItem = ({ item }) => {
    const { modifiers, onDayPress } = this.props;

    return (
      <CalendarMonth
        modifiers={modifiers}
        weeks={item.weeks}
        month={item.month}
        onDayPress={onDayPress}
      />
    );
  };

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log("------------viewableItems");
    viewableItems.map(m =>
      console.log(m.item.month.format("MMMM YYYY"))
    );
    console.log("-----------changed");
    changed.map(m =>
      console.log(
        `${m.item.month.format("MMMM YYYY")} ${m.isViewable}`
      )
    );
  };

  render() {
    const { listViewProps, theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <VirtualizedList
          data={this.state.months}
          getItemCount={(data) => data ? data.length : 0}
          getItem={(data, index) => data[index]}
          renderItem={this.renderItem}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          onEndReachedThreshold={1}
          windowSize={6}
          showsVerticalScrollIndicator={false}
          //debug={true}
          //{...listViewProps}
          //onViewableItemsChanged={this.onViewableItemsChanged}
          // getItem={(data, index) => data[index]}
          // getItemCount={data => data.length}
          // {...listViewProps}sss
        />
      </ThemeProvider>
    );
  }
}
