// @flow
import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import type { ComputedModifiers, ThemeType } from "./types";
import getModifiersStylesFromTheme from "./utils/getModifiersStylesFromTheme";
import getDefaultStylesFromTheme from "./utils/getDefaultStylesFromTheme";
import eqSet from "./utils/eqSet";

// Receives props for a CalendarDay and returns
// true if it is within a selection span
const isSelected = (modifiers: ComputedModifiers): boolean =>
  modifiers.has("selected") ||
  modifiers.has("selectedStart") ||
  modifiers.has("selectedSpan") ||
  modifiers.has("selectedEnd");

type DefaultProps = {
  modifiers: ComputedModifiers,
  onDayPress: (moment$Moment, ComputedModifiers) => any
};

type Props = DefaultProps & {
  day: moment$Moment,
  theme?: ThemeType
};

const Wrapper = styled.View`
${{
  flex: 1,
  alignSelf: "stretch",
  // Hack to avoid this issue
  // https://github.com/facebook/react-native/issues/10539
  marginLeft: -1,
  marginRight: -1
}}
`;

const Container = styled.View`
  ${({ theme }: Props) => ({
    marginVertical: 3,
    marginHorizontal: 5,
    overflow: "hidden",
    ...getDefaultStylesFromTheme(theme, ["calendarDay", "container"])
  })}
  ${({ modifiers }: Props) =>
    isSelected(modifiers) && {
      borderRadius: 400,
      backgroundColor: "#ccc",
      overflow: "hidden"
    }}
  ${({ modifiers }: Props) =>
    modifiers.has("selectedStart") && {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      marginHorizontal: 0
    }}
  ${({ modifiers }: Props) =>
    modifiers.has("selectedEnd") && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      marginHorizontal: 0
    }}
  ${({ modifiers }: Props) =>
    modifiers.has("selectedSpan") && {
      marginHorizontal: 0,
      borderRadius: 0
    }}
  ${({ theme, modifiers }: Props) => ({
    ...getModifiersStylesFromTheme(modifiers, theme, [
      "calendarDay",
      "container"
    ])
  })}
`;

const Text = styled.Text`
  ${({ theme }: Props) => ({
    textAlign: "center",
    paddingVertical: 13,
    fontSize: 16,
    zIndex: 2,
    ...getDefaultStylesFromTheme(theme, ["calendarDay", "text"])
  })}
  ${({ modifiers }: Props) =>
    isSelected(modifiers) && {
      color: "white",
      fontWeight: "bold"
    }}
  ${({ modifiers }: Props) =>
    modifiers.has("past") && {
      textDecorationLine: "none",
      opacity: 0.5
    }}
  ${({ modifiers }: Props) =>
    modifiers.has("blocked") && {
      opacity: 0.7
    }}

  ${({ theme, modifiers }: Props) => ({
    ...getModifiersStylesFromTheme(modifiers, theme, [
      "calendarDay",
      "text"
    ])
  })}
`;

const TodayMarker = styled.Text`
  ${({ theme }: Props) => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    zIndex: 1,
    ...getDefaultStylesFromTheme(theme, [
      "calendarDay",
      "todayMarker"
    ])
  })}
  ${({ modifiers }: Props) =>
    isSelected(modifiers) && {
      color: "white"
    }}
  ${({ theme, modifiers }: Props) => ({
    ...getModifiersStylesFromTheme(modifiers, theme, [
      "calendarDay",
      "todayMarker"
    ])
  })}
`;

const BlockedMarkerContainer = styled.View`
  ${({ theme }: Props) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 2,
    backgroundColor: "transparent",
    ...getDefaultStylesFromTheme(theme, [
      "calendarDay",
      "blockedMarkerContainer"
    ])
  })}
  ${({ theme, modifiers }: Props) => ({
    ...getModifiersStylesFromTheme(modifiers, theme, [
      "calendarDay",
      "blockedMarkerContainer"
    ])
  })}
`;

const BlockedMarker = styled.Text`
  ${({ theme }: Props) => ({
    transform: "rotate(45deg)",
    fontWeight: 100,
    textAlign: "center",
    fontSize: 32,
    marginTop: -4,
    ...getDefaultStylesFromTheme(theme, [
      "calendarDay",
      "blockedMarker"
    ])
  })}
  ${({ theme, modifiers }: Props) => ({
    ...getModifiersStylesFromTheme(modifiers, theme, [
      "calendarDay",
      "blockedMarker"
    ])
  })}
`;

export default class CalendarDay extends React.Component<
  DefaultProps,
  Props,
  void
> {
  static defaultProps = {
    modifiers: new Set(),
    onDayPress: () => {}
  };

  shouldComponentUpdate(nextProps: Props) {
    return !eqSet(this.props.modifiers, nextProps.modifiers);
  }

  isBlocked = () => this.props.modifiers.has("blocked");
  isSelected = () => this.props.modifiers.has("selected");

  renderTodayMarker() {
    const { modifiers } = this.props;
    if (modifiers.has("today")) {
      return <TodayMarker modifiers={modifiers}>.</TodayMarker>;
    }
    return null;
  }

  renderBlockedMarker() {
    if (this.isBlocked()) {
      return (
        <BlockedMarkerContainer modifiers={this.props.modifiers}>
          <BlockedMarker modifiers={this.props.modifiers}>
            |
          </BlockedMarker>
        </BlockedMarkerContainer>
      );
    }
    return null;
  }

  render() {
    const { day, onDayPress, modifiers } = this.props;

    return (
      <Wrapper>
        {day &&
          <TouchableWithoutFeedback onPress={() => onDayPress(day, modifiers)}>
            {/* Make sure Touchable fills the whole space */}
            <View style={{ flex: 1 }}>
              <Container modifiers={modifiers}>
                <Text modifiers={modifiers}>
                  {day.format("D")}
                </Text>
                {this.renderTodayMarker()}
                {this.renderBlockedMarker()}
              </Container>
            </View>
          </TouchableWithoutFeedback>}
      </Wrapper>
    );
  }
}
