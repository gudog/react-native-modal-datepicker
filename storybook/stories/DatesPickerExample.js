import React, { Component } from 'react'
import { DatesPicker } from './../../src'

export default class DatesPickerExample extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dates: []
    }
  }

  onDatesChange = (dates) => {
    this.setState({ dates })
  }

  render () {
    const { dates } = this.state

    return (
      <DatesPicker
        onDatesChange={this.onDatesChange}
        dates={dates}
      />
    )
  }
}