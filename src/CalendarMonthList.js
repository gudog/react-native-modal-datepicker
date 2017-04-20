import React, { PropTypes } from 'react'
import moment from 'moment'
import MomentPropTypes from 'react-moment-proptypes'
import { ListView } from 'react-native'
import CalendarMonth from './CalendarMonth'
import getCalendarMonthWeeks from './utils/getCalendarMonthWeeks'

import isMonthIncluded from './utils/isMonthIncluded'
import styles from './Styles/CalendarMonthListStyle'

export default class CalendarMonthList extends React.Component {

  static propTypes = {
    mode: PropTypes.string,
    initialMonth: MomentPropTypes.momentObj,
    dates: PropTypes.array,
    modifiers: PropTypes.object,
    onDayPress: PropTypes.func
  };

  static defaultProps = {
    mode: 'dateRange',
    initialMonth: moment(),
    numberOfMonths: 24,
    dates: [],
    modifiers: {}
  };

  constructor (props) {
    super(props)
    const { numberOfMonths, initialMonth } = this.props

    let month = initialMonth.clone().startOf('month')
    const months = []
    for (let i = 0; i < numberOfMonths; i++) {
      months.push({
        month: month,
        weeks: getCalendarMonthWeeks(month, false)
      })
      month = month.clone().add(1, 'month')
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        // console.log(`rowHasChanged ${r1.month.format('MMMM')}: ${(r1 !== r2)}`)
        return (r1 !== r2)
      }
    })

    this.state = {
      months: months,
      dataSource: dataSource.cloneWithRows(months)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dates, startDate, endDate } = this.props
    const {
      mode,
      dates: nextDates,
      startDate: nextStartDate,
      endDate: nextEndDate
    } = nextProps

    const { months, dataSource } = this.state
    let newMonths

    if (mode === 'dates') {
      newMonths = months.map((monthRow) => {
        const { month } = monthRow
        if (isMonthIncluded(month, nextDates) ||
            isMonthIncluded(month, dates)) {
          // console.log(`flagging ${month.format('MMMM Y')} as dirty`)
          return Object.assign({}, monthRow) // Change the reference to object
        } else {
          return monthRow // keep the same reference
        }
      })
    } else if (mode === 'dateRange') {
      // Tag all the months that need to be re-rendered
      newMonths = months.map((monthRow) => {
        const { month } = monthRow
        if (month.isSame(nextStartDate, 'month') ||
            month.isSame(nextEndDate, 'month') ||
            month.isBetween(nextStartDate, nextEndDate, 'month') ||
            month.isSame(startDate, 'month') ||
            month.isSame(endDate, 'month') ||
            month.isBetween(startDate, endDate, 'month')) {
          // console.log(`flagging ${month.format('MMMM Y')} as dirty`)
          return Object.assign({}, monthRow) // Change the reference to object
        } else {
          return monthRow // keep the same reference
        }
      })
    }

    this.setState({
      months: newMonths,
      dataSource: dataSource.cloneWithRows(newMonths)
    })
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    const {
      modifiers,
      onDayPress,
      calendarMonthStyle,
      calendarMonthTitleStyle,
      calendarMonthWeekStyle,
      calendarDaySelectedTextStyle,
      calendarDayPastTextStyle,
      calendarDayContainerStyle,
      calendarDayTextStyle,
      calendarDaySelectedContainerStyle,
      calendarDaySelectedStartContainerStyle,
      calendarDaySelectedEndContainerStyle
    } = this.props

    return (
      <CalendarMonth
        modifiers={modifiers}
        weeks={rowData.weeks}
        month={rowData.month}
        onDayPress={onDayPress}
        containerStyle={calendarMonthStyle}
        titleStyle={calendarMonthTitleStyle}
        weekStyle={calendarMonthWeekStyle}
        calendarDaySelectedTextStyle={calendarDaySelectedTextStyle}
        calendarDayPastTextStyle={calendarDayPastTextStyle}
        calendarDayContainerStyle={calendarDayContainerStyle}
        calendarDayTextStyle={calendarDayTextStyle}
        calendarDaySelectedContainerStyle={calendarDaySelectedContainerStyle}
        calendarDaySelectedStartContainerStyle={calendarDaySelectedStartContainerStyle}
        calendarDaySelectedEndContainerStyle={calendarDaySelectedEndContainerStyle}
      />
    )
  }

  render () {
    const { listViewProps, listViewsStyle } = this.props

    return (
      <ListView
        style={[styles.container, listViewsStyle]}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        initialListSize={2}
        pageSize={2}
        scrollRenderAheadDistance={200}
        showsVerticalScrollIndicator={false}
        {...listViewProps}
      />
    )
  }
}
