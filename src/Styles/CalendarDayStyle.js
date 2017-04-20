import { StyleSheet } from 'react-native'
// import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginVertical: 3,
    marginHorizontal: 5,
    overflow: 'hidden'
  },
  selectedContainer: {
    borderRadius: 400,
    backgroundColor: '#ccc',
    overflow: 'hidden'
  },
  selectedStartContainer: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginHorizontal: 0
  },
  selectedEndContainer: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: 0
  },
  selectedSpanContainer: {
    marginHorizontal: 0,
    borderRadius: 0
  },
  todayMarker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    zIndex: 1
  },
  todayMarkerSelected: {
    color: 'white'
  },
  text: {
    textAlign: 'center',
    paddingVertical: 13,
    fontSize: 16,
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  pastText: {
    textDecorationLine: 'none',
    opacity: 0.5
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold'
  },
  blockedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7
  }
})
