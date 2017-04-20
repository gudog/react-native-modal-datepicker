import React from 'react'
import { storiesOf } from '@kadira/react-native-storybook'
import { withKnobs, number } from '@kadira/storybook-addon-knobs'

import CenterView from './CenterView'
import SingleDatePickerExample from './SingleDatePickerExample'
import DatesPickerExample from './DatesPickerExample'
import DateRangePickerExample from './DateRangePickerExample'

import { CalendarMonthList } from './../../src'

storiesOf('DatesPicker', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Single Date', () => <SingleDatePickerExample maxNumberOfDates={number('maxNumberOfDates', 1)} />)
  .add('Multiple Dates', () => <DatesPickerExample />)

storiesOf('DateRangePicker', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <DateRangePickerExample />)

storiesOf('CalendarMonthList', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <CalendarMonthList
      numberOfMonths={number('numberOfMonths', 24)}
    />
  ))

