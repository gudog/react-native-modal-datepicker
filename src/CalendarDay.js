import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/CalendarDayStyle'

export default class CalendarDay extends React.PureComponent {

  handleOnPress = () => {
    const { day, onDayPress, modifiers } = this.props
    onDayPress(day, modifiers)
  }

  renderTodayMarker () {
    const selected = this.props.modifiers.includes('selected')

    if (this.props.isToday) {
      return (
        <Text
          style={[styles.todayMarker, selected ? styles.todayMarkerSelected : null]}
          >.</Text>
      )
    }
  }

  render () {
    const {
      day,
      past,
      modifiers,
      // Custom styles
      selectedContainerStyle,
      selectedTextStyle,
      pastTextStyle,
      containerStyle,
      textStyle
    } = this.props

    const isSelected = (
        modifiers.includes('selected') ||
        modifiers.includes('selectedStart') ||
        modifiers.includes('selectedSpan') ||
        modifiers.includes('selectedEnd')
    )

    const computedContainerStyle = modifiers.map((modifier) => {
      return [styles[`${modifier}Container`], this.props[`${modifier}ContainerStyle`]]
    })

    // Add the common styles for any kind of selected day
    if (isSelected) {
      computedContainerStyle.unshift([styles['selectedContainer'], selectedContainerStyle])
    }

    const textStyles = [
      textStyle,
      past ? [styles.pastText, pastTextStyle] : null,
      isSelected ? [styles.selectedText, selectedTextStyle] : null
    ]

    return (
      <TouchableWithoutFeedback onPress={this.handleOnPress} activeOpacity={0.5} >
        <View style={[styles.container, containerStyle, computedContainerStyle]}>
          <Text style={[styles.text, textStyles]}>{day.format('D')}</Text>
          {this.renderTodayMarker()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
