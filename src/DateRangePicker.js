import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import momentPropTypes from 'react-moment-proptypes'
import moment from 'moment'

import DateInput from './DateInput'
import CalendarModal from './CalendarModal'

const propTypes = {
  numberOfMonths: PropTypes.number,
  initialVisibleMonth: PropTypes.func,
  isOutsideRange: PropTypes.func,
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,

  onDatesChange: PropTypes.func,
  onClearPress: PropTypes.func,

  // Custom props for main RN components
  modalProps: React.PropTypes.object,

  // Custom user styles
  style: View.propTypes.style,
  dateInputStyle: View.propTypes.style,
  dateInputTextStyle: Text.propTypes.style,
  calendarModalStyle: View.propTypes.style,
  calendarModalFooterStyle: View.propTypes.style,
  calendarModalFooterButtonStyle: View.propTypes.style,
  calendarModalFooterTextStyle: Text.propTypes.style,
  calendarMonthListStyle: View.propTypes.style,
  calendarMonthStyle: View.propTypes.style,
  calendarMonthTitleStyle: Text.propTypes.style,
  calendarMonthWeekStyle: View.propTypes.style,
  calendarDaySelectedTextStyle: Text.propTypes.style,
  calendarDayPastTextStyle: Text.propTypes.style,
  calendarDayContainerStyle: View.propTypes.style,
  calendarDaySelectedContainerStyle: View.propTypes.style,
  calendarDaySelectedStartContainerStyle: View.propTypes.style,
  calendarDaySelectedEndContainerStyle: View.propTypes.style,

  // i18n
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape({
    selectDates: PropTypes.node,
    clear: PropTypes.node,
    save: PropTypes.node
  })
}

const defaultProps = {
  numberOfMonths: 12,
  initialVisibleMonth: () => moment(),
  isOutsideRange: day => day && !day.isSameOrAfter(moment(), 'day'),
  startDate: null,
  endDate: null,
  onDatesChange () {},
  onClearPress () {},

  // i18n
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: {
    selectDates: 'Select Date Range',
    clearDates: 'Clear',
    save: 'Save',
    startDate: 'Start Date',
    endDate: 'End Date'
  }
}

export default class DateRangePicker extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      calendarVisible: false
    }
  }

  isBlocked (day) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props
    return isOutsideRange(day)
  }

  isStartDate (day) {
    return day.isSame(this.props.startDate, 'day')
  }

  isInSelectedSpan (day) {
    const { startDate, endDate } = this.props
    return day.isBetween(startDate, endDate)
  }

  isEndDate (day) {
    return day.isSame(this.props.endDate, 'day')
  }

  onDayPress = (day, modifiers) => {
    if (modifiers.includes('blocked')) return

    let { startDate, endDate } = this.props

    if (!startDate && !endDate) {
      // Nothing was selected
      startDate = day
    } else if (startDate && !endDate) {
      // Only startDate date was selected

      // If the selected day is before the startDate, we use the previous
      // date as endDate
      if (day.isBefore(startDate)) {
        endDate = startDate
        startDate = day
      } else if (day.isAfter(startDate)) {
        endDate = day
      }
    } else if (startDate && endDate) {
      // Both startDate and endDate were selected

      if (day.isBetween(startDate, endDate)) {
        // If the selected day is between the selected range,
        // we adjust the selected range

        // TODO: change this to find the closest date
        endDate = day
      } else {
        // Otherwise, reset the date range and set the day as new startDate
        startDate = day
        endDate = null
      }
    }

    this.props.onDatesChange({ startDate, endDate })
  }

  openCalendar = () => {
    this.setState({calendarVisible: true})
  }

  closeCalendar = () => {
    this.props.onClearPress()
    this.setState({calendarVisible: false})
  }

  //  TODO: rename this
  saveCalendar = () => {
    this.setState({calendarVisible: false})
  }

  renderCalendar () {
    const { calendarVisible } = this.state
    const { startDate, endDate, onClearPress } = this.props
    const {
      initialVisibleMonth,
      numberOfMonths,
      monthFormat,
      phrases,
      modalProps,
      listViewProps,
      calendarModalStyle,
      calendarModalFooterStyle,
      calendarModalFooterButtonStyle,
      calendarModalFooterTextStyle,
      calendarMonthListStyle,
      calendarMonthStyle,
      calendarMonthTitleStyle,
      calendarMonthWeekStyle,
      calendarDaySelectedTextStyle,
      calendarDayPastTextStyle,
      calendarDayContainerStyle,
      calendarDaySelectedContainerStyle,
      calendarDaySelectedStartContainerStyle,
      calendarDaySelectedEndContainerStyle
    } = this.props

    const modifiers = {
      blocked: day => this.isBlocked(day),
      'selectedStart': day => this.isStartDate(day),
      'selectedEnd': day => this.isEndDate(day),
      'selectedSpan': day => this.isInSelectedSpan(day)
    }

    return (
      <CalendarModal
        mode='dateRange'
        startDate={startDate}
        endDate={endDate}
        initialVisibleMonth={initialVisibleMonth}
        numberOfMonths={numberOfMonths}
        monthFormat={monthFormat}
        phrases={phrases}
        modifiers={modifiers}
        visible={calendarVisible}
        // Callbacks
        onDayPress={this.onDayPress}
        onClearPress={onClearPress}
        onClosePress={this.closeCalendar}
        onSavePress={this.saveCalendar}
        // Custom Props
        modalProps={modalProps}
        listViewProps={listViewProps}
        // Custom Styles
        containerStyle={calendarModalStyle}
        footerStyle={calendarModalFooterStyle}
        footerButtonStyle={calendarModalFooterButtonStyle}
        footerTextStyle={calendarModalFooterTextStyle}
        calendarMonthListStyle={calendarMonthListStyle}
        calendarMonthStyle={calendarMonthStyle}
        calendarMonthTitleStyle={calendarMonthTitleStyle}
        calendarMonthWeekStyle={calendarMonthWeekStyle}
        calendarDaySelectedTextStyle={calendarDaySelectedTextStyle}
        calendarDayPastTextStyle={calendarDayPastTextStyle}
        calendarDayContainerStyle={calendarDayContainerStyle}
        calendarDaySelectedContainerStyle={calendarDaySelectedContainerStyle}
        calendarDaySelectedStartContainerStyle={calendarDaySelectedStartContainerStyle}
        calendarDaySelectedEndContainerStyle={calendarDaySelectedEndContainerStyle}
      />
    )
  }

  render () {
    const { startDate, endDate, phrases, dateInputStyle, dateInputTextStyle } = this.props

    return (
      <View>
        <DateInput 
          onPress={this.openCalendar}
          mode='dateRange'
          startDate={startDate}
          endDate={endDate}
          phrases={phrases} 
          containerStyle={dateInputStyle}
          textStyle={dateInputTextStyle}
        />
        {this.renderCalendar()}
      </View>
    )
  }
}

DateRangePicker.propTypes = propTypes
DateRangePicker.defaultProps = defaultProps
