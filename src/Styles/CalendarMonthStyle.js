import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  month: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 12
  },
  week: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  day: {
    flex: 1,
    alignSelf: 'stretch',
    // Hack to avoid this issue
    // https://github.com/facebook/react-native/issues/10539
    marginLeft: -1,
    marginRight: -1
  },
  monthTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 12
  }
})
