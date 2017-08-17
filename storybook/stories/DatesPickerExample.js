import React, { Component } from "react";
import { ModalDatePicker } from "./../../src";


const theme = {
  calendarMonth: {
    title: {
      color: "red"
    }
  }
};


export default class DatesPickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    };
  }

  onValueChange = dates => {
    this.setState({ dates });
  };

  render() {
    const { dates } = this.state;

    return (
      <ModalDatePicker
        mode="dates"
        onValueChange={this.onValueChange}
        value={dates}
        numberOfMonths={6}
        theme={theme}
      />
    );
  }
}
