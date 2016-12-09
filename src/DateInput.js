import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import defaultStyles from './Styles/DateInputStyle'

export default class DateInput extends React.Component {

  renderSelectedDates () {
    const { mode, phrases, maxNumberOfDates } = this.props

    if (mode === 'dates') {
      const { dates } = this.props
      const label = (maxNumberOfDates === 1 ? phrases.selectDate : phrases.selectDates)

      return (dates && dates.length)
        ? dates.map((day) => day.format('D MMM')).join(', ')
        : label
    } else if (mode === 'dateRange') {
      const { startDate, endDate } = this.props

      return (startDate && endDate)
        ? `${startDate.format('l')} - ${endDate.format('l')}`
        : phrases.selectDates
    }
  }

  render () {
    const { containerStyle, textStyle } = this.props

    return (
      <View style={[defaultStyles.container, containerStyle]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={[defaultStyles.text, textStyle]}>
            {this.renderSelectedDates()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
