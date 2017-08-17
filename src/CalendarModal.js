// @flow

import React, { createElement } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import DatesPicker from "./DatesPicker";
import DateRangePicker from "./DateRangePicker";
import WeekHeader from "./WeekHeader";

import type {
  CalendarModalProps,
  DatesArray,
  InputValue
} from "./types";

const Container = styled.View`
  ${props => {
    return {
      position: "absolute",
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "column",
      ...props.theme.calendarModalContainer
    };
  }}
`;

const TopActions = styled.View`
  ${{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }}
`;

const CloseButtonText = styled.Text`
  ${props => {
    return {
      fontSize: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
      ...props.theme.calendarModalCloseButtonText
    };
  }}
`;
const ResetButtonText = styled.Text`
  ${props => {
    return {
      fontSize: 13,
      paddingHorizontal: 10,
      paddingVertical: 10,
      ...props.theme.calendarModalResetButtonText
    };
  }}
`;

const SelectedDates = styled.View`
  ${props => {
    return {
      paddingHorizontal: 20,
      height: 110,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      ...props.theme.calendarModalSelectedDates
    };
  }}
`;

const SelectedDateText = styled.Text`
  ${props => {
    return {
      fontSize: 24,
      fontWeight: "200",
      textAlign: "center",
      flex: 1,
      alignSelf: "center",
      ...props.theme.calendarModalSelectedDateText
    };
  }}
  ${props =>
    props.left && {
      textAlign: "left",
      paddingRight: 30
    }}}
  ${props =>
    props.right && {
      textAlign: "right",
      paddingLeft: 30
    }}}
`;

const RangeSeparator = styled.Text`
  ${props => {
    return {
      textAlign: "center",
      fontSize: "60",
      transform: "rotate(40deg)",
      zIndex: 2,
      fontWeight: "100",
      color: "black",
      ...props.theme.calendarModalRangeSeparator
    };
  }}
`;
const Footer = styled.View`
  ${props => {
    return {
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      ...props.theme.calendarModalFooter
    };
  }}
`;

const FooterButton = styled.TouchableOpacity`
  ${props => {
    return {
      backgroundColor: "#ccc",
      borderRadius: 4,
      overflow: "hidden",
      marginHorizontal: 20,
      paddingVertical: 10,
      ...props.theme.calendarModalFooterButton
    };
  }}
`;

const FooterText = styled.Text`
  ${props => {
    return {
      textAlign: "center",
      ...props.theme.calendarModalFooterText
    };
  }}
`;

type Props = CalendarModalProps;

type State = {
  value: InputValue
};

export default class CalendarModal extends React.Component {
  props: Props;
  state: State;
  currentMonth: moment$Moment;

  static defaultProps = {
    numberOfMonths: 3,
    background: null,
    onDayPress() {},
    onClearPress() {},
  };

  constructor(props: CalendarModalProps) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleValueChange = (value: InputValue) => {
    this.setState({ value });
  }

  handleClearPress = () => {
    this.setState({ value: null });
  }

  handleSavePress = () => {
    this.props.onValueChange(this.state.value);
    this.props.onClosePress();
  }

  renderSelectedDates() {
    const { value } = this.state;

    if (value) {
      const { phrases, mode, maxNumberOfDates } = this.props;

      if (mode === "dates") {
        const dates: DatesArray = value;

        if (dates && dates.length) {
          return (
            <SelectedDateText numberOfLines={3}>
              {dates.map(day => day.format("D\u00a0MMM")).join(", ")}
            </SelectedDateText>
          );
        }
        return (
          <SelectedDateText>
            {maxNumberOfDates === 1
              ? phrases.selectDate
              : phrases.selectDates}
          </SelectedDateText>
        );
      }

      // mode == dateRange
      const { startDate, endDate } = value;

      return (
        <View style={{ flexDirection: "row", flex: 1 }}>
          <SelectedDateText left numberOfLines={2}>
            {startDate
              ? startDate.format("dddd D\u00a0MMM")
              : phrases.startDate}
          </SelectedDateText>

          <RangeSeparator>|</RangeSeparator>

          <SelectedDateText right numberOfLines={2}>
            {endDate
              ? endDate.format("dddd D\u00a0MMM")
              : phrases.endDate}
          </SelectedDateText>
        </View>
      );
    }
    return null;
  }

  renderPicker() {
    const { value } = this.state;

    const Picker = this.props.mode === "dates"
      ? DatesPicker
      : DateRangePicker;

    return createElement(Picker, {
      ...this.props,
      value,
      onValueChange: this.handleValueChange
    });
  }

  renderFooter() {
    const { phrases } = this.props;

    return (
      <Footer>
        <FooterButton onPress={this.handleSavePress}>
          <FooterText>{phrases.save}</FooterText>
        </FooterButton>
      </Footer>
    );
  }

  render() {
    const {
      calendarModalBackground,
      calendarModalVisible,
      onClosePress,
      phrases
    } = this.props;

    return (
      <Modal visible={calendarModalVisible} animationType="slide">
        {calendarModalBackground}
        <Container>
          <TopActions>
            <TouchableOpacity onPress={onClosePress}>
              <CloseButtonText>X</CloseButtonText>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleClearPress}>
              <ResetButtonText>
                {phrases.clear}
              </ResetButtonText>
            </TouchableOpacity>
          </TopActions>

          <SelectedDates>{this.renderSelectedDates()}</SelectedDates>

          <WeekHeader />

          {this.renderPicker()}

          {this.renderFooter()}
        </Container>
      </Modal>
    );
  }
}

// CalendarModal.propTypes = propTypes;
// CalendarModal.defaultProps = defaultProps;
