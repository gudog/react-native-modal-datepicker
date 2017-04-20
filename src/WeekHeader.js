import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'
import defaultStyles from './Styles/WeekHeaderStyle'

const WeekHeader = ({ headerStyle, dayTextStyle }) => {
  const header = []
  for (let i = 0; i < 7; i++) {
    header.push(
      <Text key={i} style={[defaultStyles.day, dayTextStyle]}>
        {moment().weekday(i).format('dd')}
      </Text>
    )
  }

  return (
    <View style={[defaultStyles.header, headerStyle]}>
      {header}
    </View>
  )
}

export default WeekHeader
