import React from 'react';
import { atom } from 'recoil';

const calendarPage = atom({
  key: 'calendarPage',
  default: new Date(),
});

const calendarSummary = atom({
  key: 'calendarSummary',
  default: null,
});

export default calendarPage;
