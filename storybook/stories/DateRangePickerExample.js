import React, { Component } from 'react'
import { DateRangePicker } from './../../src'

const theme = {
  dateInputContainer: {
    backgroundColor: 'blue'
  },
  dateInputText: {
    color: 'red'
  },
  calendarDayTodayMarker: {
    color: 'blue'
  },
  calendarDaySelectedTodayMarker: {
    color: 'red'
  }
}

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

  render () {
    const { startDate, endDate } = this.state

    return (
      <DateRangePicker
        onDatesChange={this.onDatesChange}
        startDate={startDate}
        endDate={endDate}
        theme={theme}
      />
    )
  }
}