import { StyleSheet } from 'react-native'
// import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column'
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    fontSize: 20,
    padding: 10
  },
  resetButton: {
    fontSize: 13,
    padding: 10
  },
  selectedDates: {
    paddingHorizontal: 20,
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  selectedDate: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1
  },
  startDate: {
    fontSize: 24,
    fontWeight: '200',
    textAlign: 'left',
    paddingRight: 30
  },
  endDate: {
    fontSize: 24,
    fontWeight: '200',
    textAlign: 'right',
    paddingLeft: 30
  },
  rangeSeparator: {
    textAlign: 'center',
    flex: 0.4,
    fontSize: 60,
    transform: [{ rotate: '40deg' }],
    fontWeight: '100'
  },
  calendarMonthList: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    flex: 1
  },
  weekHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  weekDay: {
    flex: 1,
    textAlign: 'center'
  },
  footer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  footerButton: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 20,
    paddingVertical: 10
  },
  footerText: {
    textAlign: 'center'
  }
})
