import React, { PropTypes } from 'react'
import { Text, View, Modal, TouchableOpacity } from 'react-native'
import moment from 'moment'
import momentPropTypes from 'react-moment-proptypes'

import defaultStyles from './Styles/CalendarModalStyle'
import CalendarMonthList from './CalendarMonthList'
import WeekHeader from './WeekHeader'

const propTypes = {
  mode: PropTypes.string,
  numberOfMonths: PropTypes.number,
  initialVisibleMonth: PropTypes.func,
  dates: PropTypes.arrayOf(momentPropTypes.momentObj),
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,

  // Custom styles
  closeButtonTextStyle: Text.propTypes.style,
  resetButtonTextStyle: Text.propTypes.style,
  calendarModalStyle: View.propTypes.style,
  calendarMonthListStyle: View.propTypes.style,
  selectedDatesStyle: View.propTypes.style,
  selectedDateTextStyle: Text.propTypes.style,
  weekHeaderStyle: View.propTypes.style,
  weekDayTextStyle: Text.propTypes.style,
  rangeSeparatorTextStyle: Text.propTypes.style,

  // Custom props
  modalProps: PropTypes.object,
  listViewProps: PropTypes.object,

  onDayPress: PropTypes.func,
  onClearPress: PropTypes.func,
  onClosePress: PropTypes.func,
  onSavePress: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape({
    clearDates: PropTypes.node,
    save: PropTypes.node
  })
}

const defaultProps = {
  mode: 'dates', // 'dates' or 'dateRange'
  numberOfMonths: 3,
  initialVisibleMonth: () => moment(),
  dates: [],
  startDate: null,
  endDate: null,
  onDayPress () {},
  onClearPress () {},
  onClosePress () {},
  onSavePress () {},

  // i18n
  monthFormat: 'MMMM YYYY',
  phrases: PropTypes.shape({
    clearDates: PropTypes.node,
    save: PropTypes.node,
    startDate: PropTypes.node,
    endDate: PropTypes.node
  })
}

export default class CalendarModal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      currentMonth: props.initialVisibleMonth()
    }
  }

  renderSelectedDates () {
    const {
      phrases,
      mode,
      maxNumberOfDates,
      selectedDateTextStyle,
      selectedDatesStyle,
      rangeSeparatorTextStyle
    } = this.props
    if (mode === 'dates') {
      const { dates } = this.props

      if (dates.length) {
        return (
          <View style={[defaultStyles.selectedDates, selectedDatesStyle]}>
            <Text style={[defaultStyles.selectedDate, selectedDateTextStyle]} numberOfLines={3}>
              {dates.map((day) => day.format('D\u00a0MMM')).join(', ')}
            </Text>
          </View>
        )
      } else {
        return (
          <View style={[defaultStyles.selectedDates, selectedDatesStyle]}>
            <Text style={[defaultStyles.selectedDate, selectedDateTextStyle]}>
              {maxNumberOfDates === 1 ? phrases.selectDate : phrases.selectDates}
            </Text>
          </View>
        )
      }
    } else if (mode === 'dateRange') {
      const { startDate, endDate } = this.props

      return (
        <View style={[defaultStyles.selectedDates, selectedDatesStyle]}>
          <Text style={[defaultStyles.selectedDate, selectedDateTextStyle, defaultStyles.startDate]} numberOfLines={2}>
            { startDate ? startDate.format('dddd D\u00a0MMM') : phrases.startDate }
          </Text>
          <Text style={[defaultStyles.rangeSeparator, rangeSeparatorTextStyle]}>|</Text>
          <Text style={[defaultStyles.selectedDate, selectedDateTextStyle, defaultStyles.endDate]} numberOfLines={2}>
            { endDate ? endDate.format('dddd D\u00a0MMM') : phrases.endDate }
          </Text>
        </View>
      )
    }
  }

  renderFooter () {
    const {
      phrases,
      onSavePress,
      footerStyle,
      footerButtonStyle,
      footerTextStyle
    } = this.props

    return (
      <View style={[defaultStyles.footer, footerStyle]}>
        <TouchableOpacity style={[defaultStyles.footerButton, footerButtonStyle]} onPress={onSavePress}>
          <Text style={[defaultStyles.footerText, footerTextStyle]}>
            {phrases.save}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const {
      mode,
      visible,
      monthFormat,
      onClosePress,
      onClearPress,
      onDayPress,
      numberOfMonths,
      phrases,
      dates,
      startDate,
      endDate,
      modifiers,
      modalProps,
      listViewProps,
      background,
      containerStyle,
      closeButtonTextStyle,
      resetButtonTextStyle,
      weekHeaderStyle,
      weekDayTextStyle,
      calendarMonthListStyle,
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

    const { currentMonth } = this.state

    return (
      <Modal visible={visible} animationType='slide' {...modalProps}>
        {background}
        <View style={[defaultStyles.modal, containerStyle]}>

          <View style={defaultStyles.topActions}>
            <TouchableOpacity onPress={onClosePress}>
              <Text style={[defaultStyles.closeButton, closeButtonTextStyle]}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClearPress}>
              <Text style={[defaultStyles.resetButton, resetButtonTextStyle]}>{phrases.clearDates}</Text>
            </TouchableOpacity >
          </View>

          {this.renderSelectedDates()}
          
          <WeekHeader headerStyle={weekHeaderStyle} dayTextStyle={weekDayTextStyle} />

          <View style={defaultStyles.calendarMonthList}>
            <CalendarMonthList
              mode={mode}
              initialMonth={currentMonth}
              onDayPress={onDayPress}
              numberOfMonths={numberOfMonths}
              monthFormat={monthFormat}
              modifiers={modifiers}
              dates={dates}
              startDate={startDate}
              endDate={endDate}
              listViewProps={listViewProps}
              listViewsStyle={calendarMonthListStyle}
              calendarMonthStyle={calendarMonthStyle}
              calendarMonthTitleStyle={calendarMonthTitleStyle}
              calendarMonthWeekStyle={calendarMonthWeekStyle}
              calendarDaySelectedTextStyle={calendarDaySelectedTextStyle}
              calendarDayPastTextStyle={calendarDayPastTextStyle}
              calendarDayContainerStyle={calendarDayContainerStyle}
              calendarDayTextStyle={calendarDayTextStyle}
              calendarDaySelectedContainerStyle={calendarDaySelectedContainerStyle}
              calendarDaySelectedStartContainerStyle={calendarDaySelectedStartContainerStyle}
              calendarDaySelectedEndContainerStyle={calendarDaySelectedEndContainerStyle}
            />
          </View>
          {this.renderFooter()}
        </View>
      </Modal>
    )
  }
}

CalendarModal.propTypes = propTypes
CalendarModal.defaultProps = defaultProps

