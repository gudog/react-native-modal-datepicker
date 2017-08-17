// @flow
import React from "react";
import styled from "styled-components/native";
import { path } from "ramda";
import { TouchableOpacity } from "react-native";

import type { DateInputProps } from "./types";

const getStylesFromTheme = (element: string, theme): any => {
  return path(["dateInput", element], theme);
};

const Container = styled.View`
  ${({ theme }) => ({
    backgroundColor: "#eee",
    overflow: "hidden",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    ...getStylesFromTheme("container", theme)
  })};
`;

const Text = styled.Text`
  ${({ theme }) => ({
    textAlign: "center",
    ...getStylesFromTheme("text", theme)
  })};
`;

type Props = DateInputProps;

export default class DateInput extends React.PureComponent<void, Props, void> {
  renderSelectedDates() {
    const { mode, phrases, maxNumberOfDates } = this.props;

    if (mode === "dates") {
      const dates = this.props.value;

      const label = maxNumberOfDates === 1
        ? phrases.selectDate
        : phrases.selectDates;

      return dates && dates.length
        ? dates.map(day => day.format("D MMM")).join(", ")
        : label;
    } else if (mode === "dateRange") {
      const { startDate, endDate } = this.props.value;

      return startDate && endDate
        ? `${startDate.format("l")} - ${endDate.format("l")}`
        : phrases.selectDates;
    }
    return null;
  }

  render() {
    return (
      <Container>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text>
            {this.renderSelectedDates()}
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
