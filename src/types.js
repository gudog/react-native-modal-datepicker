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
  |}
|};

export type DateRange = {
  startDate?: moment$Moment,
  endDate?: moment$Moment
};
export type DatesArray = Array<moment$Moment>;
export type InputValue = ?DatesArray | ?DateRange;

export type DatePickerMode = "dates" | "dateRange";

export type PickerProps<ValueType> = {
  theme: ThemeType,
  style: StyleSheet,
  calendarVisible: boolean,
  numberOfMonths: number,
  maxNumberOfDates: number,
  initialVisibleMonth: Function,
  value: ValueType,
  isOutsideRange: Function,

  onValueChange: Function,

  // Custom props for main RN components
  modalProps: Object,
  listViewProps: Object,

  // A React element to be used as background
  calendarModalBackground: ?React.Element<*>,

  // i18n
  // displayFormat: string | Function,
  monthFormat: string,
  phrases: PhrasesType
};

export type Modifiers = { [string]: Function };
export type ComputedModifiers = Set<string>;

// export type ThemeType =
//   | {
//       dateInputContainer: Object,
//       dateInputText: Object,
//       calendarDayContainer: Object,
//       calendarDaySelectedContainer: Object,
//       calendarDaySelectedStartContainer: Object,
//       calendarDaySelectedEndContainer: Object,
//       calendarDaySelectedSpanContainer: Object,
//       calendarDayBlockedContainer: Object,
//       calendarDayText: Object,
//       calendarDaySelectedText: Object,
//       calendarDayPastText: Object,
//       calendarDayBlockedText: Object,
//       calendarDayTodayMarker: Object,
//       calendarDaySelectedTodayMarker: Object,
//       calendarDayBlockedMarkerContainer: Object,
//       calendarDayBlockedMarkerText: Object,
//       calendarModalContainer: Object,
//       calendarModalCloseButtonText: Object,
//       calendarModalResetButtonText: Object,
//       calendarModalSelectedDates: Object,
//       calendarModalSelectedDateText: Object,
//       calendarModalRangeSeparator: Object,
//       calendarModalFooter: Object,
//       calendarModalFooterButton: Object,
//       calendarModalFooterText: Object,
//       calendarMonthContainer: Object,
//       calendarMonthTitle: Object,
//       calendarMonthWeek: Object,
//       weekHeaderContainer: Object,
//       weekHeaderDayText: Object
//     }
//   | {};
