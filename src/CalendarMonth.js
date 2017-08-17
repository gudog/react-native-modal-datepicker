// @flow
import React from "react";
import styled from "styled-components/native";
import { path } from "ramda";
import moment from "moment";

import CalendarDay from "./CalendarDay";
import getDefaultModifiers from "./utils/getDefaultModifiers";
import getComputedModifiers from "./utils/getComputedModifiers";

import type { Modifiers } from "./types";

const getStylesFromTheme = (element: string, theme): any => {
  return path(["calendarMonth", element], theme);
};

const Container = styled.View`
  ${({ theme }) => ({
    flexDirection: "column",
    paddingVertical: 12,
    ...getStylesFromTheme("container", theme)
  })};
`;
const MonthTitle = styled.Text`
  ${({ theme }) => ({
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 12,
    ...getStylesFromTheme("title", theme)
  })};
`;
const Week = styled.View`
  ${({ theme }) => ({
    flexDirection: "row",
    alignItems: "stretch",
    ...getStylesFromTheme("week", theme)
  })};
`;

type Props = {
  month: moment$Moment,
  weeks: Array<Array<moment$Moment>>,
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

    return (
      <Container>
        <MonthTitle>
          {monthTitle}
        </MonthTitle>
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
