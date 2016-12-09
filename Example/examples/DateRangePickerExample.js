import React, { Component } from 'react'
import { DateRangePicker } from 'react-native-modal-datepicker'

export default class DateRangePickerExample extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null
    }
  }

  onDatesChange = (dates) => {
    this.setState({ ...dates })
  }

  resetDates = () => {
    this.setState({startDate: null, endDate: null})
  }

  render () {
    const { startDate, endDate } = this.state

    return (
      <DateRangePicker
        onDatesChange={this.onDatesChange}
        onClearPress={this.resetDates}
        startDate={startDate}
        endDate={endDate}
        style={{}}
        dateInputStyle={{}}
        dateInputTextStyle={{}}
        calendarModalStyle={{}}
        calendarModalFooterStyle={{}}
        calendarModalFooterButtonStyle={{}}
        calendarModalFooterTextStyle={{}}
        calendarMonthListStyle={{}}
        calendarMonthStyle={{}}
        calendarMonthTitleStyle={{}}
        calendarMonthWeekStyle={{}}
        calendarDaySelectedTextStyle={{}}
        calendarDayPastTextStyle={{}}
        calendarDayContainerStyle={{}}
        calendarDaySelectedContainerStyle={{}}
        calendarDaySelectedStartContainerStyle={{}}
        calendarDaySelectedEndContainerStyle={{}}
      />
    )
  }
}
