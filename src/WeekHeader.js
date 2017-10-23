import React from "react";
import moment from "moment";
import { path } from "ramda";
import styled from "styled-components/native";

const getStylesFromTheme = (element: string, theme): any => {
  return path(["weekHeader", element], theme);
};

const Container = styled.View`
  ${({ theme }) => {
    return {
      flexDirection: "row",
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      ...getStylesFromTheme("container", theme)
    };
  }};
`;

const Day = styled.Text`
  ${({ theme }) => {
    return {
      flex: 1,
      textAlign: "center",
      ...getStylesFromTheme("dayText", theme)
    };
  }};
`;
const WeekHeader = () => {
  const header = [];

  for (let i = 0; i < 7; i++) {
    header.push(
      <Day key={i}>
        {moment().weekday(i).format("dd")}
      </Day>
    );
  }

  return (
    <Container>
      {header}
    </Container>
  );
};

export default WeekHeader;
