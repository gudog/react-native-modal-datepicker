import React from 'react';
import { Text } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';

import CenterView from './CenterView';
import SingleDatePickerExample from './SingleDatePickerExample';
import DatesPickerExample from './DatesPickerExample';
import DateRangePickerExample from './DateRangePickerExample';

import { DatesPicker } from './../../src'

storiesOf('DatesPicker', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Single Date', () => <SingleDatePickerExample/>)
  .add('Multiple Dates', () => <DatesPickerExample/>)

storiesOf('DateRangePicker', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <DateRangePickerExample/>)
    