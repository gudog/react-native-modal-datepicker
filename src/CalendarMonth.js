import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import momentPropTypes from 'react-moment-proptypes'
import moment from 'moment'

import CalendarDay from './CalendarDay'
import styles from './Styles/CalendarMonthStyle'

const propTypes = {
  month: momentPropTypes.momentObj,
  dates: PropTypes.arrayOf(momentPropTypes.momentObj),
  onDayPress: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string
}

const defaultProps = {
  month: moment(),
  dates: [],
  onDayPress () {},

  // i18n
  monthFormat: 'MMMM YYYY' // english locale
}

export function getModifiersForDay (modifiers, day) {
  return day ? Object.keys(modifiers).filter(key => modifiers[key](day)) : []
}

export default class CalendarMonth extends React.Component {

  render () {
    const {
      month,
      onDayPress,
      monthFormat,
      weeks,
      modifiers,
      containerStyle,
      titleStyle,
      weekStyle,
      calendarDaySelectedTextStyle,
      calendarDayPastTextStyle,
      calendarDayContainerStyle,
      calendarDaySelectedContainerStyle,
      calendarDaySelectedStartContainerStyle,
      calendarDaySelectedEndContainerStyle
    } = this.props

    const monthTitle = month.format(monthFormat)
    const now = moment()

    return (
      <View style={[styles.month, containerStyle]}>
        <Text style={[styles.monthTitle, titleStyle]}>{monthTitle}</Text>
        {weeks.map((week, i) =>
          <View style={[styles.week, weekStyle]} key={i}>
            {week.map((day, j) => {
              const modifiersForDay = getModifiersForDay(modifiers, day)
              const past = day && day.isBefore(now, 'day')
              const isToday = day && day.isSame(now, 'day')

              return (
                <View key={j} style={styles.day}>
                  {day &&
                    <CalendarDay day={day}
                      onDayPress={onDayPress}
                      modifiers={modifiersForDay}
                      past={past}
                      isToday={isToday}
                      selectedTextStyle={calendarDaySelectedTextStyle}
                      pastTextStyle={calendarDayPastTextStyle}
                      containerStyle={calendarDayContainerStyle}
                      selectedContainerStyle={calendarDaySelectedContainerStyle}
                      selectedStartContainerStyle={calendarDaySelectedStartContainerStyle}
                      selectedEndContainerStyle={calendarDaySelectedEndContainerStyle}
                    />
                  }
                </View>
              )
            })}
          </View>
        )}
      </View>
    )
  }
}

CalendarMonth.propTypes = propTypes
CalendarMonth.defaultProps = defaultProps
