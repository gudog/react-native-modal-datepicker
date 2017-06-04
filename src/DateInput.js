import React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

const Container = styled.View`
  ${{
    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 4,
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10
  }}
  ${props => props.theme.dateInputContainer }
`

const Text = styled.Text`
  ${{
    textAlign: 'center'
  }}
  ${props => props.theme.dateInputText}
`

export default class DateInput extends React.Component {

  renderSelectedDates () {
    const { mode, phrases, maxNumberOfDates } = this.props

    if (mode === 'dates') {
      const { dates } = this.props
      const label = (maxNumberOfDates === 1 ? phrases.selectDate : phrases.selectDates)

      return (dates && dates.length)
        ? dates.map((day) => day.format('D MMM')).join(', ')
        : label
    } else if (mode === 'dateRange') {
      const { startDate, endDate } = this.props

      return (startDate && endDate)
        ? `${startDate.format('l')} - ${endDate.format('l')}`
        : phrases.selectDates
    }
  }

  render () {
    return (
      <Container>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text>
            {this.renderSelectedDates()}
          </Text>
        </TouchableOpacity>
      </Container>
    )
  }
}
