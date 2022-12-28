import { endOfMonth, format, startOfMonth } from 'date-fns';

const getMonthDate = (date: Date) => {
  const MonthStart = format(startOfMonth(date), 'yyyyMMdd');
  const MonthEnd = format(endOfMonth(date), 'yyyyMMdd');
  const MonthDate = `${MonthStart}-${MonthEnd}`;
  return MonthDate;
};

export { getMonthDate };
