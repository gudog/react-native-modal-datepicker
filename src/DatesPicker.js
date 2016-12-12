import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import momentPropTypes from 'react-moment-proptypes'
import moment from 'moment'

import DateInput from './DateInput'
import CalendarModal from './CalendarModal'
import isDayIncluded from './utils/isDayIncluded'
import sortDates from './utils/sortDates'

const propTypes = {
  numberOfMonths: PropTypes.number,
  maxNumberOfDates: PropTypes.number,
  initialVisibleMonth: PropTypes.func,
  dates: PropTypes.arrayOf(momentPropTypes.momentObj),
  isOutsideRange: PropTypes.func,

  onDatesChange: PropTypes.func,

  // Custom props for main RN components
  modalProps: React.PropTypes.object,
  listViewProps: React.PropTypes.object,

  // Custom user styles
  style: View.propTypes.style,
  dateInputStyle: View.propTypes.style,
  dateInputTextStyle: Text.propTypes.style,
  calendarModalStyle: View.propTypes.style,
  calendarModalFooterStyle: View.propTypes.style,
  calendarModalFooterButtonStyle: View.propTypes.style,
  calendarModalFooterTextStyle: Text.propTypes.style,
  calendarMonthListStyle: View.propTypes.style,
  calendarMonthStyle: View.propTypes.style,
  calendarMonthTitleStyle: Text.propTypes.style,
  calendarMonthWeekStyle: View.propTypes.style,
  calendarDaySelectedTextStyle: Text.propTypes.style,
  calendarDayPastTextStyle: Text.propTypes.style,
  calendarDayContainerStyle: View.propTypes.style,
  calendarDaySelectedContainerStyle: View.propTypes.style,
  calendarDaySelectedStartContainerStyle: View.propTypes.style,
  calendarDaySelectedEndContainerStyle: View.propTypes.style,

  // i18n
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape({
    selectDate: PropTypes.node,
    selectDates: PropTypes.node,
    clear: PropTypes.node,
    save: PropTypes.node
  })
}

const defaultProps = {
  numberOfMonths: 12,
  maxNumberOfDates: 100,
  initialVisibleMonth: () => moment(),
  onDatesChange () {},
  dates: [],
  isOutsideRange: day => day && !day.isSameOrAfter(moment(), 'day'),

  // i18n
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: {
    selectDate: 'Select Date',
    selectDates: 'Select Dates',
    clearDates: 'Clear',
    save: 'Save'
  }
}

export default class DatesPicker extends React.Component {

  constructor (props) {
    super(props)

    // state.dates => dates selected in the modal
    // props.dates => dates selected in dateInput (after pressing Save)

    this.state = {
      calendarVisible: false,
      dates: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dates !== this.state.dates) {
      this.setState({dates: nextProps.dates})
    }
  }

  isBlocked (day) {
    // const { isDayBlocked, isOutsideRange } = this.props
    // return isDayBlocked(day) || isOutsideRange(day);
    const { isOutsideRange } = this.props
    return isOutsideRange(day)
  }

  isSelected (day) {
    const { dates } = this.state
    return isDayIncluded(day, dates)
  }

  handleDayPress = (day, modifiers) => {
    const { dates } = this.state
    const { maxNumberOfDates } = this.props

    if (modifiers.includes('blocked')) return
    if (dates && dates.length >= maxNumberOfDates) {
      // Single date
      this.setState({ dates: [day] })
    } else {
      // Multiple dates
      if (isDayIncluded(day, dates)) {
        const newDates = dates.filter((d) => !d.isSame(day))
        this.setState({ dates: newDates })
      } else {
        this.setState({ dates: sortDates([day, ...dates]) })
      }
    }
  }

  handleOnDateInputPress = () => {
    this.setState({calendarVisible: true})
  }

  handleClosePress = () => {
    this.setState({calendarVisible: false, dates: this.props.dates})
  }

  handleClearPress = () => {
    this.setState({dates: []})
  }

  handleSavePress = () => {
    this.setState({calendarVisible: false})
    this.props.onDatesChange(this.state.dates)
  }

  renderCalendar () {
    const { dates, calendarVisible } = this.state
    const {
      initialVisibleMonth,
      numberOfMonths,
      maxNumberOfDates,
      monthFormat,
      phrases,
      modalProps,
      listViewProps,
      calendarModalStyle,
      calendarModalFooterStyle,
      calendarModalFooterButtonStyle,
      calendarModalFooterTextStyle,
      calendarMonthListStyle,
      calendarMonthStyle,
      calendarMonthTitleStyle,
      calendarMonthWeekStyle,
      calendarDaySelectedTextStyle,
      calendarDayPastTextStyle,
      calendarDayContainerStyle,
      calendarDaySelectedContainerStyle,
      calendarDaySelectedStartContainerStyle,
      calendarDaySelectedEndContainerStyle
    } = this.props

    const modifiers = {
      blocked: day => this.isBlocked(day),
      // valid: day => !this.isBlocked(day),
      selected: day => this.isSelected(day)
    }

    return (
      <CalendarModal
        mode='dates'
        dates={dates}
        initialVisibleMonth={initialVisibleMonth}
        maxNumberOfDates={maxNumberOfDates}
        numberOfMonths={numberOfMonths}
        monthFormat={monthFormat}
        phrases={phrases}
        modifiers={modifiers}
        visible={calendarVisible}
        // Callbacks
        onDayPress={this.handleDayPress}
        onClearPress={this.handleClearPress}
        onClosePress={this.handleClosePress}
        onSavePress={this.handleSavePress}
        // Custom Props
        modalProps={modalProps}
        listViewProps={listViewProps}
        // Custom Styles
        containerStyle={calendarModalStyle}
        footerStyle={calendarModalFooterStyle}
        footerButtonStyle={calendarModalFooterButtonStyle}
        footerTextStyle={calendarModalFooterTextStyle}
        calendarMonthListStyle={calendarMonthListStyle}
        calendarMonthStyle={calendarMonthStyle}
        calendarMonthTitleStyle={calendarMonthTitleStyle}
        calendarMonthWeekStyle={calendarMonthWeekStyle}
        calendarDaySelectedTextStyle={calendarDaySelectedTextStyle}
        calendarDayPastTextStyle={calendarDayPastTextStyle}
        calendarDayContainerStyle={calendarDayContainerStyle}
        calendarDaySelectedContainerStyle={calendarDaySelectedContainerStyle}
        calendarDaySelectedStartContainerStyle={calendarDaySelectedStartContainerStyle}
        calendarDaySelectedEndContainerStyle={calendarDaySelectedEndContainerStyle}
      />
    )
  }

  render () {
    const {
      dates,
      maxNumberOfDates,
      phrases,
      style,
      dateInputStyle,
      dateInputTextStyle
    } = this.props

    return (
      <View style={style}>
        <DateInput
          onPress={this.handleOnDateInputPress}
          mode='dates'
          dates={dates}
          maxNumberOfDates={maxNumberOfDates}
          phrases={phrases}
          containerStyle={dateInputStyle}
          textStyle={dateInputTextStyle}
        />
        {this.renderCalendar()}
      </View>
    )
  }
}

DatesPicker.propTypes = propTypes
DatesPicker.defaultProps = defaultProps
