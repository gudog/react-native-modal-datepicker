// @flow

import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import CalendarMonthList from "./CalendarMonthList";
import WeekHeader from "./WeekHeader";

import type {
  DatePickerMode,
  // InputValue,
  PhrasesType,
  DatesArray
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

type DefaultProps = {
  numberOfMonths: number,
  background: ?React.Component<any, any, any>,
  onDayPress: Function,
  onClearPress: Function,
  onClosePress: Function,
  onSavePress: Function
};

type Props = DefaultProps & {
  mode: DatePickerMode,
  phrases: PhrasesType,
  visible: boolean,
  initialVisibleMonth: Function,
  selectedDates: any, // TODO: fix this
  modifiers: Object,
  maxNumberOfDates: number,

  // Custom props
  modalProps: Object,
  listViewProps: Object,

  // i18n
  monthFormat: string
};

type State = {
  currentMonth: moment$Moment
};

export default class CalendarModal extends React.Component<
  DefaultProps,
  Props,
  State
> {
  props: Props;
  state: State;

  static defaultProps = {
    numberOfMonths: 3,
    background: null,
    onDayPress() {},
    onClearPress() {},
    onClosePress() {},
    onSavePress() {}
  };

  constructor(props: Props) {
    super(props);
    
    this.state = {
      currentMonth: props.initialVisibleMonth()
    };
  }

  renderSelectedDates() {
    const { phrases, mode, maxNumberOfDates } = this.props;

    if (mode === "dates") {
      const dates: DatesArray = this.props.selectedDates;

      if (dates && dates.length) {
        return (
          <SelectedDateText numberOfLines={3}>
            {dates.map(day => day.format("D\u00a0MMM")).join(", ")}
          </SelectedDateText>
        );
      }
      return (
        <SelectedDateText>
          {maxNumberOfDates === 1 ? phrases.selectDate : phrases.selectDates}
        </SelectedDateText>
      );
    }

    // mode == dateRange
    const { startDate, endDate } = this.props.selectedDates;

    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <SelectedDateText left numberOfLines={2}>
          {startDate ? startDate.format("dddd D\u00a0MMM") : phrases.startDate}
        </SelectedDateText>

        <RangeSeparator>|</RangeSeparator>

        <SelectedDateText right numberOfLines={2}>
          {endDate ? endDate.format("dddd D\u00a0MMM") : phrases.endDate}
        </SelectedDateText>
      </View>
    );
  }

  renderFooter() {
    const { phrases, onSavePress } = this.props;

    return (
      <Footer>
        <FooterButton onPress={onSavePress}>
          <FooterText>{phrases.save}</FooterText>
        </FooterButton>
      </Footer>
    );
  }

  render() {
    const {
      mode,
      visible,
      monthFormat,
      onClosePress,
      onClearPress,
      onDayPress,
      numberOfMonths,
      phrases,
      selectedDates,
      modifiers,
      modalProps,
      listViewProps,
      background
    } = this.props;

    const { currentMonth } = this.state;

    return (
      <Modal visible={visible} animationType="slide" {...modalProps}>
        {background}
        <Container>
          <TopActions>
            <TouchableOpacity onPress={onClosePress}>
              <CloseButtonText>X</CloseButtonText>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClearPress}>
              <ResetButtonText>
                {phrases.clear}
              </ResetButtonText>
            </TouchableOpacity>
          </TopActions>

          <SelectedDates>
            {this.renderSelectedDates()}
          </SelectedDates>

          <WeekHeader />

          <CalendarMonthList
            mode={mode}
            initialMonth={currentMonth}
            onDayPress={onDayPress}
            numberOfMonths={numberOfMonths}
            monthFormat={monthFormat}
            modifiers={modifiers}
            selectedDates={selectedDates}
            listViewProps={listViewProps}
          />
          {this.renderFooter()}
        </Container>
      </Modal>
    );
  }
}

// CalendarModal.propTypes = propTypes;
// CalendarModal.defaultProps = defaultProps;
