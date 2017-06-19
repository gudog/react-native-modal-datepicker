import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { ThemeProvider } from 'styled-components'
import momentPropTypes from 'react-moment-proptypes'
import moment from 'moment'

import DateInput from './DateInput'
import ThemePropTypes from './ThemePropTypes'
import CalendarModal from './CalendarModal'
import isDayIncluded from './utils/isDayIncluded'
import sortDates from './utils/sortDates'

const propTypes = {
  theme: ThemePropTypes,
  numberOfMonths: PropTypes.number,
  maxNumberOfDates: PropTypes.number,
  initialVisibleMonth: PropTypes.func,
  dates: PropTypes.arrayOf(momentPropTypes.momentObj),
  isOutsideRange: PropTypes.func,

  onDatesChange: PropTypes.func,

  // Custom props for main RN components
  modalProps: React.PropTypes.object,
  listViewProps: React.PropTypes.object,

  // A React element to be used as background
  calendarModalBackground: React.PropTypes.element,

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
  },
  theme: {}
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

  isSelected;
 (day) {
    const { dates } = this.state
    return isDayIncluded(day, dates)
  }

  handleDayPress = (day) => {
    const { dates } = this.state
    const { maxNumberOfDates } = this.props

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
      calendarModalBackground
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
        // Background
        background={calendarModalBackground}
      />
    )
  }

  render () {
    const {
      dates,
      maxNumberOfDates,
      phrases,
      style,
      theme
    } = this.props

    return (
      <ThemeProvider theme={theme}>
        <View style={style}>
          <DateInput
            onPress={this.handleOnDateInputPress}
            mode='dates'
            dates={dates}
            maxNumberOfDates={maxNumberOfDates}
            phrases={phrases}
          />
          {this.renderCalendar()}
        </View>
      </ThemeProvider>
    )
  }
}

DatesPicker.propTypes = propTypes
DatesPicker.defaultProps = defaultProps
