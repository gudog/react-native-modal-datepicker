import React, { Component } from "react";
import { ModalDatePicker } from "./../../src";

export default class SingleDatePickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    };
  }

  onDatesChange = dates => {
    this.setState({ dates });
  };

  render() {
    const { dates } = this.state;

    return (
      <ModalDatePicker
        onDatesChange={this.onDatesChange}
        dates={dates}
        maxNumberOfDates={1}
        {...this.props}
      />
    );
  }
}
