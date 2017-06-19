// @flow

export type PhrasesType = {
  selectDate: string,
  selectDates: string,
  startDate: string,
  endDate: string,
  clear: string,
  save: string
};

export type DateRange = {
  startDate?: moment$Moment,
  endDate?: moment$Moment
};
export type DatesArray = Array<moment$Moment>;
export type InputValue = ?DatesArray | ?DateRange;

export type DatePickerMode = "dates" | "dateRange";

export type Modifiers = {[string]: Function};

export type ThemeType =
  | {
      dateInputContainer: Object,
      dateInputText: Object,
      calendarDayContainer: Object,
      calendarDaySelectedContainer: Object,
      calendarDaySelectedStartContainer: Object,
      calendarDaySelectedEndContainer: Object,
      calendarDaySelectedSpanContainer: Object,
      calendarDayBlockedContainer: Object,
      calendarDayText: Object,
      calendarDaySelectedText: Object,
      calendarDayPastText: Object,
      calendarDayBlockedText: Object,
      calendarDayTodayMarker: Object,
      calendarDaySelectedTodayMarker: Object,
      calendarDayBlockedMarkerContainer: Object,
      calendarDayBlockedMarkerText: Object,
      calendarModalContainer: Object,
      calendarModalCloseButtonText: Object,
      calendarModalResetButtonText: Object,
      calendarModalSelectedDates: Object,
      calendarModalSelectedDateText: Object,
      calendarModalRangeSeparator: Object,
      calendarModalFooter: Object,
      calendarModalFooterButton: Object,
      calendarModalFooterText: Object,
      calendarMonthContainer: Object,
      calendarMonthTitle: Object,
      calendarMonthWeek: Object,
      weekHeaderContainer: Object,
      weekHeaderDayText: Object
    }
  | {};
