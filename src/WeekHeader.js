import React from 'react'
import moment from 'moment'
import styled from 'styled-components/native'


const Container = styled.View`
  ${props => {
    return {
      flexDirection: 'row',
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      ...props.theme.weekHeaderContainer
    }
  }}
`

const Day = styled.Text`
  ${props => {
    return {
      flex: 1,
      textAlign: 'center',
      ...props.theme.weekHeaderContainerDay
    }
  }}
`
const WeekHeader = ({ headerStyle, dayTextStyle }) => {
  const header = []
  for (let i = 0; i < 7; i++) {
    header.push(
      <Day key={i}>
        {moment().weekday(i).format('dd')}
      </Day>
    )
  }

  return <Container>{header}</Container>
}

export default WeekHeader
