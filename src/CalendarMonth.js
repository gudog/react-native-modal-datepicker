// @flow
import Perf from 'ReactPerf';
import React from "react";
import styled from "styled-components/native";
import moment from "moment";

import CalendarDay from "./CalendarDay";

import type { Modifiers, ComputedModifiers } from "./types";

const Container = styled.View`
  ${props => ({
    flexDirection: "column",
    paddingVertical: 12,
    ...props.theme.calendarMonthContainer
  })}
`;
const MonthTitle = styled.Text`
  ${props => ({
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 12,
    ...props.theme.calendarMonthTitle
  })}
`;
const Week = styled.View`
  ${props => ({
    flexDirection: "row",
    alignItems: "stretch",
    ...props.theme.calendarMonthWeek
  })}
`;
const DayContainer = styled.View`
  ${{
    flex: 1,
    alignSelf: "stretch",
    // Hack to avoid this issue
    // https://github.com/facebook/react-native/issues/10539
    marginLeft: -1,
    marginRight: -1
  }}
`;

function getDefaultModifiers(): Modifiers {
  const today = moment();
  return {
    past: day => day && day.isBefore(today, "day"),
    today: day => day && day.isSame(today, "day")
  };
}

type Props = {
  month: moment$Moment,
  weeks: Array<any>, // TODO: change this
  onDayPress?: moment$Moment => any,
  modifiers: Modifiers,

  // i18n
  monthFormat: string
};

function getComputedModifiers(
  defaultModifiers: Modifiers,
  modifiers: Modifiers,
  day: moment$Moment
): ComputedModifiers {
  const computedModifiers = new Set();

  if (day) {
    const combinedModifiers = Object.assign(
      defaultModifiers,
      modifiers
    );

    const keys = Object.keys(combinedModifiers);
    keys.forEach(key => {
      if (combinedModifiers[key](day)) {
        computedModifiers.add(key);
      }
    });
  }
  return computedModifiers;
}

export default class CalendarMonth extends React.PureComponent<
  any,
  Props,
  void
> {
  static defaultProps = {
    month: moment(),
    onDayPress() {},

    // i18n
    monthFormat: "MMMM YYYY" // english locale
  };

  componentDidMount() {
    // We have to push it to the next tick otherwise React Native would have
    // problems with the WorkerPerformance
    setTimeout(() => {
      Perf.start();

      // Some arbitrary time for metrics
      setTimeout(() => {
        Perf.stop();
        Perf.printWasted();
      }, 5000);

    }, 0);
 }

  render() {
    const {
      month,
      onDayPress,
      monthFormat,
      weeks,
      modifiers
    } = this.props;

    const monthTitle = month.format(monthFormat);
    const defaultModifiers = getDefaultModifiers();

    return (
      <Container>
        <MonthTitle>{monthTitle}</MonthTitle>
        {weeks.map((week, i) =>
          <Week key={i}>
            {week.map((day, j) => {
              const computedModifiers = getComputedModifiers(
                defaultModifiers,
                modifiers,
                day
              );

              return (
                <DayContainer key={j}>
                  {day &&
                    <CalendarDay
                      day={day}
                      modifiers={computedModifiers}
                      onDayPress={onDayPress}
                    />}
                </DayContainer>
              );
            })}
          </Week>
        )}
      </Container>
    );
  }
}
