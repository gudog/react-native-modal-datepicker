// @flow
import React from "react";

import moment from "moment";
import { FlatList } from "react-native";
import { ThemeProvider } from "styled-components";
import CalendarMonth from "./CalendarMonth";
import getCalendarMonthWeeks from "./utils/getCalendarMonthWeeks";

import isMonthIncluded from "./utils/isMonthIncluded";
import type { CalendarMonthListProps } from "./types";

type Props = CalendarMonthListProps;

type State = {
  months: Array<any>
};

const defaultProps = {
  mode: "dates",
  initialMonth: moment(),
  numberOfMonths: 24,
  // selectedDates: null,
  modifiers: {},
  theme: {}
};
type DefaultProps = typeof defaultProps;

export default class CalendarMonthList extends React.Component<
  DefaultProps,
  Props,
  State
> {
  props: Props;
  state: State;

  static defaultProps: DefaultProps = defaultProps;

  constructor(props: Props) {
    super(props);

    const { numberOfMonths, initialMonth } = this.props;
    let month = initialMonth.clone().startOf("month");
    month.locale(false); // Make sure we always use the global moment locale

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

    const { months } = this.state;
    let newMonths;

    if (mode === "dates") {
      newMonths = months.map(monthRow => {
        const { month } = monthRow;
        if (
          isMonthIncluded(month, nextSelectedDates) ||
          isMonthIncluded(month, selectedDates)
        ) {
          monthRow.refresh = true;
        } else {
          monthRow.refresh = false;
        }
        return monthRow; // keep the same reference
      });
    } else if (mode === "dateRange") {
      // Tag all the months that need to be re-rendered
      const { startDate, endDate } = selectedDates;
      const {
        startDate: nextStartDate,
        endDate: nextEndDate
      } = nextSelectedDates;
      newMonths = months.map(monthRow => {
        const { month } = monthRow;
        if (
          month.isSame(nextStartDate, "month") ||
          month.isSame(nextEndDate, "month") ||
          month.isBetween(nextStartDate, nextEndDate, "month") ||
          month.isSame(startDate, "month") ||
          month.isSame(endDate, "month") ||
          month.isBetween(startDate, endDate, "month")
        ) {
          // console.log(`flagging ${month.format('MMMM Y')} as dirty`)
          monthRow.refresh = true;
        } else {
          monthRow.refresh = false;
        }
        return monthRow; // keep the same reference
      });
    }

    this.setState({
      months: newMonths
    });
  }

  renderItem = ({ item }) => {
    const { modifiers, onDayPress, monthFormat } = this.props;

    return (
      <CalendarMonth
        modifiers={modifiers}
        weeks={item.weeks}
        month={item.month}
        refresh={item.refresh}
        onDayPress={onDayPress}
        monthFormat={monthFormat}
      />
    );
  };

  // onViewableItemsChanged = ({ viewableItems, changed }) => {
  //   console.log("------------viewableItems");
  //   viewableItems.map(m =>
  //     console.log(m.item.month.format("MMMM YYYY"))
  //   );
  //   console.log("-----------changed");
  //   changed.map(m =>
  //     console.log(
  //       `${m.item.month.format("MMMM YYYY")} ${m.isViewable}`
  //     )
  //   );
  // };

  render() {
    const { theme } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <FlatList
          data={this.state.months}
          // getItemCount={data => (data ? data.length : 0)}
          // getItem={(data, index) => data[index]}
          renderItem={this.renderItem}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          onEndReachedThreshold={1}
          windowSize={6}
          showsVerticalScrollIndicator={false}
          // debug={true}
          // {...listViewProps}
          // onViewableItemsChanged={this.onViewableItemsChanged}
          // getItem={(data, index) => data[index]}
          // getItemCount={data => data.length}
          // {...listViewProps}sss
        />
      </ThemeProvider>
    );
  }
}
