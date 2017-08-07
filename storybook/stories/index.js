/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import Button from './Button';
// import CenterView from './CenterView';
// import Welcome from './Welcome';

import CenterView from './CenterView';
import SingleDatePickerExample from "./SingleDatePickerExample";
import DatesPickerExample from "./DatesPickerExample";
import DateRangePickerExample from "./DateRangePickerExample";
import { ModalDatePicker, CalendarMonthList, WeekHeader } from "./../../src";

storiesOf("ModalDatePicker", module)
.addDecorator(getStory =>
  <CenterView>
    {getStory()}
  </CenterView>
)
// .add("Single Date", () =>
//   <SingleDatePickerExample maxNumberOfDates={1} />
// )
.add("Multiple dates", () => <DatesPickerExample/>);

storiesOf("CalendarMonthList", module)
.add("12 months", () => <CalendarMonthList numberOfMonths={12} />)
.add("24 months", () => <CalendarMonthList numberOfMonths={24} />);

