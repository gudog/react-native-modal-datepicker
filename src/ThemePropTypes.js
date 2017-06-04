import { PropTypes } from 'react'

export default PropTypes.shape({
  calendarDayContainer: PropTypes.object,
  calendarDaySelectedContainer: PropTypes.object,
  calendarDaySelectedStartContainer: PropTypes.object,
  calendarDaySelectedEndContainer: PropTypes.object,
  calendarDaySelectedSpanContainer: PropTypes.object,
  calendarDayText: PropTypes.object,
  calendarDaySelectedText: PropTypes.object,
  calendarDayPastText: PropTypes.object,
  calendarDayBlockedText: PropTypes.object,
  calendarDayTodayMarker: PropTypes.object,
  calendarDaySelectedTodayMarker: PropTypes.object,
  calendarModalContainer: PropTypes.object,
  calendarModalCloseButtonText: PropTypes.object,
  calendarModalResetButtonText: PropTypes.object,
  calendarModalSelectedDates: PropTypes.object,
  calendarModalSelectedDateText: PropTypes.object,
  calendarModalRangeSeparator: PropTypes.object,
  calendarModalFooter: PropTypes.object,
  calendarModalFooterButton: PropTypes.object,
  calendarModalFooterText: PropTypes.object,
  calendarMonthContainer: PropTypes.object,
  calendarMonthTitle: PropTypes.object,
  calendarMonthWeek: PropTypes.object,
  weekHeaderContainer: PropTypes.object,
  weekHeaderDayText: PropTypes.object
})