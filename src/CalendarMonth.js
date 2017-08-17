// @flow
import React from "react";
import styled from "styled-components/native";
import moment from "moment";

import CalendarDay from "./CalendarDay";
import getDefaultModifiers from "./utils/getDefaultModifiers";
import getComputedModifiers from "./utils/getComputedModifiers";

import type { Modifiers } from "./types";

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

type Props = {
  month: moment$Moment,
  weeks: Array<any>, // TODO: change this
  onDayPress?: moment$Moment => any,
  modifiers: Modifiers,
  refresh: boolean,

  // i18n
  monthFormat: string
};

const defaultModifiers = getDefaultModifiers();

export default class CalendarMonth extends React.Component<
  any,
  Props,
  void
> {
  static defaultProps = {
    month: moment(),
    onDayPress() {},
    refresh: false,

    // i18n
    monthFormat: "MMMM YYYY" // english locale
  };

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.refresh === true;
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

    console.log(`rendering ${monthTitle}`)
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
                <CalendarDay
                  key={j}
                  day={day}
                  modifiers={computedModifiers}
                  onDayPress={onDayPress}
                />
              );
            })}
          </Week>
        )}
      </Container>
    );
  }
}
