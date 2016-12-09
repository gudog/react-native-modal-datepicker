import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import moment from 'moment'
import 'moment/locale/es'
import 'moment/locale/en-gb'

import DatesPickerExample from './examples/DatesPickerExample'
import DateRangePickerExample from './examples/DateRangePickerExample'
import SingleDatePickerExample from './examples/SingleDatePickerExample'

export default class Example extends Component {

  constructor (props) {
    super(props)
    moment.locale('en-gb')
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>react-native-modal-datepicker</Text>
        <Text style={[styles.text, styles.singleDatePickerExampleText]}>
          Single date picker
        </Text>
        <SingleDatePickerExample />

        <Text style={[styles.text, styles.datesPickerExampleText]}>
          Multiple dates picker
        </Text>
        <DatesPickerExample />

        <Text style={[styles.text, styles.dateRangePickerExampleText]}>
          Date Range picker
        </Text>
        <DateRangePickerExample />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40
  },
  text: {
    width: 200,
    textAlign: 'center',
    marginBottom: 10
  },
  datesPickerExampleText: {
    marginTop: 40
  },
  dateRangePickerExampleText: {
    marginTop: 40
  }
})

AppRegistry.registerComponent('Example', () => Example)
