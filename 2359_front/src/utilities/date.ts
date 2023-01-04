import {
  addDays,
  endOfMonth,
  isSameMonth,
  isSaturday,
  isSunday,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  format,
} from 'date-fns';

const getCurrentDate = () => {
  return Date.now().toString(10);
};

const getMonthDate = (date: Date) => {
  const MonthStart = format(startOfMonth(date), 'yyyyMMdd');
  const MonthEnd = format(endOfMonth(date), 'yyyyMMdd');
  const MonthDate = `${MonthStart}-${MonthEnd}`;
  return MonthDate;
};

function weekColor(week: string) {
  if (week === '일') {
    return 'text-red-600';
  }
  if (week === '토') {
    return 'text-blue-600';
  }
  return '';
}

function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start));

  return function () {
    const week = [...Array(7)].map((_, index) => addDays(date, index));
    date = addDays(week[6], 1);
    return week;
  };
}

function takeMonth(start = new Date()) {
  let month: Date[][] = [];
  let date = start;

  return function () {
    const weekGen = takeWeek(startOfMonth(date));
    const endDate = startOfDay(endOfMonth(date));
    month.push(weekGen());
    while (lastDayofRange(month) < endDate) {
      month.push(weekGen());
    }

    const range = month;
    month = [];
    date = addDays(lastDayofRange(range), 1);

    return range;
  };
}
function lastDayofRange(range: Date[][]) {
  return range[range.length - 1][6];
}

function dayColor(day: Date, currentDate: Date) {
  if (isSameMonth(day, currentDate) && isSunday(day)) {
    return 'text-red-600';
  }
  if (isSameMonth(day, currentDate) && isSaturday(day)) {
    return 'text-blue-600';
  }
  if (isSameMonth(day, currentDate)) {
    return 'text-black';
  }
  return 'text-gray-300';
}
function todayColor(day: Date) {
  if (isToday(day)) {
    return 'bg-primary';
  }
  return 'bg-primaryLight';
}
function emotionEmoji(emotion: string) {
  let emoji = '';
  switch (emotion) {
    case '매우 안좋음':
      emoji = '😭';
      break;
    case '안좋음':
      emoji = '😢';
      break;
    case '보통':
      emoji = '🙂';
      break;
    case '좋음':
      emoji = '😃';
      break;
    case '매우 좋음':
      emoji = '😍';
      break;
    default:
      emoji = '';
      break;
  }
  return emoji;
}

export { getMonthDate, getCurrentDate, weekColor, takeWeek, takeMonth, dayColor, todayColor, emotionEmoji };
