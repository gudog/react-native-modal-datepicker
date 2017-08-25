// @flow
// import { StyleSheet } from "react-native";
import React from "react";

export type PhrasesType = {
  selectDate: string,
  selectDates: string,
  startDate: string,
  endDate: string,
  clear: string,
  save: string
};

type CalendarDayThemeStyles = {
  default?: Object,
  // modifiers
  past?: Object,
  today?: Object,
  selected?: Object,
  selectedStart?: Object,
  selectedSpan?: Object,
  selectedEnd?: Object
};

export type ThemeType = {|
  calendarDay?: {|
    container?: CalendarDayThemeStyles,
    text?: CalendarDayThemeStyles,
    todayMarker?: CalendarDayThemeStyles,
    blockedMarkerContainer?: CalendarDayThemeStyles,
    blockedMarker?: CalendarDayThemeStyles
  |},
  calendarModal?: {|
    container?: Object,
    closeButtonText?: Object,
    resetButtonText?: Object,
    selectedDatesContainer?: Object,
    selectedDateText?: Object,
    rangeSeparator?: Object,
    footer?: Object,
    footerButton?: Object,
    footerText?: Object,
  |},
  calendarMonth?: {|
    container?: Object,
    title?: Object,
    week?: Object
  |},
  weekHeader?: {|
    container?: Object,
    dayText?: Object
  |},
  dateInput?: {|
    container?: Object,
    text?: Object
  |}
|};

export type DateRange = {|
  startDate?: moment$Moment,
  endDate?: moment$Moment
|};
export type DatesArray = Array<moment$Moment>;
export type InputValue = ?DatesArray | ?DateRange;

export type DatePickerMode = "dates" | "dateRange";

export type Modifiers = { [string]: Function };
export type ComputedModifiers = Set<string>;

export type CalendarMonthListProps = {
  mode: DatePickerMode,
  initialMonth: moment$Moment,
  numberOfMonths: number,
  modifiers: Modifiers,
  theme: ThemeType,
  selectedDates: ?InputValue,
  onDayPress: ?(moment$Moment, ComputedModifiers) => any
};

export type DateInputProps = {
  value: InputValue,
  mode: DatePickerMode,
  maxNumberOfDates: number,

  // Callbacks
  onPress: Function,

  // i18n
  phrases: PhrasesType
};

export type PickerProps<ValueType> = {
  mode: DatePickerMode,
  value: ValueType,
  numberOfMonths: number,
  initialMonth: moment$Moment,
  isOutsideRange: Function,
  maxNumberOfDates: number,
  theme: ThemeType,
  enableBlockedDatesSelection: boolean,

  // Callbacks
  onValueChange: Function,
  onDayPress: Function,

  // i18n
  // displayFormat: string | Function,
  monthFormat: string,
  phrases: PhrasesType
};

export type CalendarModalProps = PickerProps<InputValue> & {
  calendarModalBackground: ?React.Element<*>,
  calendarModalVisible: boolean,

  // Callbacks
  onClosePress: () => void,
  onModalShow: () => void
};

export type ModalDatePickerProps = CalendarModalProps & {
  // Callbacks
  onValueChange: InputValue => void,
  onModalShow: () => void,
  onModalClose: () => void
};
