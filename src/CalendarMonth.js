import React, { PropTypes } from 'react'
import styled from 'styled-components/native'
import momentPropTypes from 'react-moment-proptypes'
import moment from 'moment'

import CalendarDay from './CalendarDay'

const Container = styled.View`
  ${props => {
    return {
      flex: 1,
      flexDirection: 'column',
      paddingVertical: 12,
      ...props.theme.calendarMonthContainer
    }
  }}
`
const MonthTitle = styled.Text`
  ${props => {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      paddingHorizontal: 12,
      ...props.theme.calendarMonthTitle
    }
  }}
`
const Week = styled.View`
  ${props => {
    return {
      flexDirection: 'row',
      alignItems: 'stretch',
      ...props.theme.calendarMonthWeek
    }
  }}
`
const DayContainer = styled.View`
  ${{
    flex: 1,
    alignSelf: 'stretch',
    // Hack to avoid this issue
    // https://github.com/facebook/react-native/issues/10539
    marginLeft: -1,
    marginRight: -1
  }}
`

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

export function getModifiersPropsForDay (modifiers, day) {
  const props = {}
  if (day) {
    const keys = Object.keys(modifiers)
    keys.forEach(key => {
      props[key] = modifiers[key](day)
    })
  }

  return props
}

export default class CalendarMonth extends React.Component {

  render () {
    const {
      month,
      onDayPress,
      monthFormat,
      weeks,
      modifiers
    } = this.props

    const monthTitle = month.format(monthFormat)
    const now = moment()

    return (
      <Container>
        <MonthTitle>{monthTitle}</MonthTitle>
        {weeks.map((week, i) =>
          <Week key={i}>
            {week.map((day, j) => {
              const modifiersPropsForDay = getModifiersPropsForDay(modifiers, day)
              const past = day && day.isBefore(now, 'day')
              const isToday = day && day.isSame(now, 'day')

              return (
                <DayContainer key={j}>
                  {day &&
                    <CalendarDay day={day}
                      {...modifiersPropsForDay}
                      onDayPress={onDayPress}
                      past={past}
                      isToday={isToday}
                    />
                  }
                </DayContainer>
              )
            })}
          </Week>
        )}
      </Container>
    )
  }
}

CalendarMonth.propTypes = propTypes
CalendarMonth.defaultProps = defaultProps
