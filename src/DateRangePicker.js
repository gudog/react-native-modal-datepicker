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

  // Custom props for main RN components
  modalProps: React.PropTypes.object,

    // A React element to be used as background
  calendarModalBackground: React.PropTypes.element,

  // Custom user styles
  style: View.propTypes.style,
  dateInputStyle: View.propTypes.style,
  dateInputTextStyle: Text.propTypes.style,
  calendarModalStyle: View.propTypes.style,
  calendarModalFooterStyle: View.propTypes.style,
  calendarModalFooterButtonStyle: View.propTypes.style,
  calendarModalFooterTextStyle: Text.propTypes.style,
  calendarModalWeekHeaderStyle: Text.propTypes.style,
  calendarModalWeekDayTextStyle: Text.propTypes.style,
  calendarModalRangeSeparatorStyle: Text.propTypes.style,
  calendarMonthListStyle: View.propTypes.style,
  calendarMonthStyle: View.propTypes.style,
  calendarMonthTitleStyle: Text.propTypes.style,
  calendarMonthWeekStyle: View.propTypes.style,
  calendarDaySelectedTextStyle: Text.propTypes.style,
  calendarDayPastTextStyle: Text.propTypes.style,
  calendarDayContainerStyle: View.propTypes.style,
  calendarDayTextStyle: View.propTypes.style,
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

    // state.startDate && state.endDate &&  => dates selected in the modal
    // props.startDate && props.endDate &&  => dates selected in dateInput

    this.state = {
      calendarVisible: false,
      startDate: null,
      endDate: null
    }
  }

  isBlocked (day) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props
    return isOutsideRange(day)
  }

  isStartDate (day) {
    return day.isSame(this.state.startDate, 'day')
  }

  isInSelectedSpan (day) {
    const { startDate, endDate } = this.state
    return day.isBetween(startDate, endDate)
  }

  isEndDate (day) {
    return day.isSame(this.state.endDate, 'day')
  }

  handleDayPress = (day, modifiers) => {
    if (modifiers.includes('blocked')) return

    let { startDate, endDate } = this.state

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

    this.setState({ startDate, endDate })
  }

  handleOnDateInputPress = () => {
    this.setState({calendarVisible: true})
  }

  handleClosePress = () => {
    this.setState({
      calendarVisible: false,
      startDate: this.props.startDate,
      endDate: this.props.endDate
    })
  }

  handleClearPress = () => {
    this.setState({
      startDate: null,
      endDate: null
    })
  }

  handleSavePress = () => {
    const { startDate, endDate } = this.state
    this.setState({calendarVisible: false})
    this.props.onDatesChange({ startDate, endDate })
  }

  renderCalendar () {
    const { calendarVisible, startDate, endDate } = this.state
    const {
      initialVisibleMonth,
      numberOfMonths,
      monthFormat,
      phrases,
      modalProps,
      listViewProps,
      calendarModalBackground,
      calendarModalStyle,
      calendarModalCloseButtonStyle,
      calendarModalResetButtonStyle,
      calendarModalSelectedDateStyle,
      calendarModalSelectedDateTextStyle,
      calendarModalFooterStyle,
      calendarModalFooterButtonStyle,
      calendarModalFooterTextStyle,
      calendarModalWeekHeaderStyle,
      calendarModalWeekDayTextStyle,
      calendarModalRangeSeparatorStyle,
      calendarMonthListStyle,
      calendarMonthStyle,
      calendarMonthTitleStyle,
      calendarMonthWeekStyle,
      calendarDaySelectedTextStyle,
      calendarDayPastTextStyle,
      calendarDayContainerStyle,
      calendarDayTextStyle,
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
        onDayPress={this.handleDayPress}
        onClearPress={this.handleClearPress}
        onClosePress={this.handleClosePress}
        onSavePress={this.handleSavePress}
        // Custom Props
        modalProps={modalProps}
        listViewProps={listViewProps}
        // Background
        background={calendarModalBackground}
        // Custom Styles
        containerStyle={calendarModalStyle}
        closeButtonStyle={calendarModalCloseButtonStyle}
        resetButtonStyle={calendarModalResetButtonStyle}
        selectedDateStyle={calendarModalSelectedDateStyle}
        selectedDateTextStyle={calendarModalSelectedDateTextStyle}
        footerStyle={calendarModalFooterStyle}
        footerButtonStyle={calendarModalFooterButtonStyle}
        footerTextStyle={calendarModalFooterTextStyle}
        weekHeaderStyle={calendarModalWeekHeaderStyle}
        weekDayTextStyle={calendarModalWeekDayTextStyle}
        rangeSeparatorStyle={calendarModalRangeSeparatorStyle}
        calendarMonthListStyle={calendarMonthListStyle}
        calendarMonthStyle={calendarMonthStyle}
        calendarMonthTitleStyle={calendarMonthTitleStyle}
        calendarMonthWeekStyle={calendarMonthWeekStyle}
        calendarDaySelectedTextStyle={calendarDaySelectedTextStyle}
        calendarDayPastTextStyle={calendarDayPastTextStyle}
        calendarDayContainerStyle={calendarDayContainerStyle}
        calendarDayTextStyle={calendarDayTextStyle}
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
          onPress={this.handleOnDateInputPress}
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
