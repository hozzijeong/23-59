import React from 'react';
import uuid from 'react-uuid';
import { atom } from 'recoil';
import { getMonthDate } from 'utilities/getMonthDate';

const calendarPage = atom({
  key: `calendarPage`,
  default: new Date(),
});

const calendarSummary = atom({
  key: `calendarSummary${getMonthDate(new Date())}`,
  default: [],
});

export { calendarPage, calendarSummary };
