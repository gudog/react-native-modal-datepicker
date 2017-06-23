import React from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";

// Receives props for a CalendarDay and returns
// true if it is within a selection span
const isSelected = ({ selected, selectedStart, selectedSpan, selectedEnd }) =>
  selected || selectedStart || selectedSpan || selectedEnd;

const Container = styled.View`
  ${props => {
    return {
      marginVertical: 3,
      marginHorizontal: 5,
      overflow: "hidden",
      ...props.theme.calendarDayContainer
    };
  }}
  ${props =>
    isSelected(props) && {
      borderRadius: 400,
      backgroundColor: "#ccc",
      overflow: "hidden",
      ...props.theme.calendarDaySelectedContainer
    }}
  ${props =>
    props.selectedStart && {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      marginHorizontal: 0,
      ...props.theme.calendarDaySelectedStartContainer
    }}
  ${props =>
    props.selectedEnd && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      marginHorizontal: 0,
      ...props.theme.calendarDaySelectedEndContainer
    }}
  ${props =>
    props.selectedSpan && {
      marginHorizontal: 0,
      borderRadius: 0,
      ...props.theme.calendarDaySelectedSpanContainer
    }}
  ${props =>
    props.blocked && {
      ...props.theme.calendarDayBlockedContainer
    }}
`;

const Text = styled.Text`
  ${props => {
    return {
      textAlign: "center",
      paddingVertical: 13,
      fontSize: 16,
      zIndex: 2,
      backgroundColor: "transparent",
      ...props.theme.calendarDayText
    };
  }}
  ${props =>
    isSelected(props) && {
      color: "white",
      fontWeight: "bold",
      ...props.theme.calendarDaySelectedText
    }}
  ${props =>
    props.past && {
      textDecorationLine: "none",
      opacity: 0.5,
      ...props.theme.calendarDayPastText
    }}
  ${props =>
    props.blocked && {
      textDecorationLine: "line-through",
      opacity: 0.7,
      ...props.theme.calendarDayBlockedText
    }}
`;

const TodayMarker = styled.Text`
  ${props => {
    return {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 24,
      zIndex: 1,
      ...props.theme.calendarDayTodayMarker
    };
  }}
  ${props =>
    props.selected && {
      color: "white",
      ...props.theme.calendarDaySelectedTodayMarker
    }}
`;

export default class CalendarDay extends React.PureComponent {
  renderTodayMarker() {
    if (this.props.isToday) {
      const { selected } = this.props;

      return <TodayMarker selected={selected}>.</TodayMarker>;
    }
  }

  render() {
    const { day, onDayPress, ...modifiersProps } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => !this.props.blocked && onDayPress(day)}
        activeOpacity={0.5}
      >
        <Container {...modifiersProps}>
          <Text {...modifiersProps}>{day.format("D")}</Text>
          {this.renderTodayMarker()}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
