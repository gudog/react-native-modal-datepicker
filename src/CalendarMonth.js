// @flow
import React from "react";
import styled from "styled-components/native";
import moment from "moment";

import CalendarDay from "./CalendarDay";

import type { Modifiers } from "./types";

const Container = styled.View`
  ${props => {
    return {
      flexDirection: "column",
      paddingVertical: 12,
      ...props.theme.calendarMonthContainer
    };
  }}
`;
const MonthTitle = styled.Text`
  ${props => {
    return {
      fontWeight: "bold",
      fontSize: 16,
      paddingHorizontal: 12,
      ...props.theme.calendarMonthTitle
    };
  }}
`;
const Week = styled.View`
  ${props => {
    return {
      flexDirection: "row",
      alignItems: "stretch",
      ...props.theme.calendarMonthWeek
    };
  }}
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

type Props = {
  month: moment$Moment,
  weeks: Array<any>, // TODO: change this
  onDayPress?: moment$Moment => any,
  modifiers: Modifiers,

  // i18n
  monthFormat: string
};

export function getModifiersPropsForDay(modifiers: Object, day: moment$Moment) {
  const props = {};
  if (day) {
    const keys = Object.keys(modifiers);
    keys.forEach(key => {
      props[key] = modifiers[key](day);
    });
  }

  return props;
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

  render() {
    const { month, onDayPress, monthFormat, weeks, modifiers } = this.props;

    const monthTitle = month.format(monthFormat);
    const now = moment();

    return (
      <Container>
        <MonthTitle>{monthTitle}</MonthTitle>
        {weeks.map((week, i) =>
          <Week key={i}>
            {week.map((day, j) => {
              const modifiersPropsForDay = getModifiersPropsForDay(
                modifiers,
                day
              );
              const past = day && day.isBefore(now, "day");
              const isToday = day && day.isSame(now, "day");

              return (
                <DayContainer key={j}>
                  {day &&
                    <CalendarDay
                      day={day}
                      {...modifiersPropsForDay}
                      onDayPress={onDayPress}
                      past={past}
                      isToday={isToday}
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
