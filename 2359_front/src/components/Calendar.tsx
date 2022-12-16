import React, { useState } from 'react';
import { startOfDay, startOfWeek, endOfMonth, startOfMonth, addDays, format, subMonths, addMonths } from 'date-fns';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';

// 요일 가져오는 함수
function CalendarWeeks() {
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <Weeks>
      {weeks.map((week) => (
        <Week key={week}>{week}</Week>
      ))}
    </Weeks>
  );
}
// 해당하는 달의 주별 날짜를 가져오는 함수
function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start));

  return function () {
    const week = [...Array(7)].map((_, index) => addDays(date, index));
    date = addDays(week[6], 1);
    return week;
  };
}
// 해당하는 달의 week 배열을 모두 저장
// 저장한 month배열의 마지막 날짜가 해당 달의 endDate보다 작다면 week배열을 가져와서 저장한다.
function lastDayofRange(range: Date[][]) {
  return range[range.length - 1][6];
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
// 날짜 색 변경
function dayColor(day: number, currentDate: Date) {
  if (format(currentDate, 'M') !== format(day, 'M')) {
    return 'text-gray-400';
  }
  return 'text-black';
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const data = takeMonth(currentDate)();
  console.log(data);
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <CalendarContainer>
      <HeaderContainer>
        <CalendarBtn type="button" onClick={prevMonth}>
          이전
        </CalendarBtn>
        <div>
          <CalendarYear>{format(currentDate, 'yyyy')}년</CalendarYear>
          <CalendarMonth>{format(currentDate, 'M')}월</CalendarMonth>
        </div>
        <CalendarBtn type="button" onClick={nextMonth}>
          다음
        </CalendarBtn>
      </HeaderContainer>
      <CalendarWeeks />
      {data.map((week) => (
        <DaysContainer key={uuid()}>
          {week.map((day: any) => (
            <CalendarDays key={uuid()}>
              <CalendarDay className={`${dayColor(day, currentDate)}`}>{format(day, 'dd')}</CalendarDay>
            </CalendarDays>
          ))}
        </DaysContainer>
      ))}
    </CalendarContainer>
  );
}
export default Calendar;

// 스타일
const CalendarBtn = tw.button`
border 
rounded-lg 
px-1 
bg-primary
`;
const Weeks = tw.div`
grid 
grid-cols-7 
text-gray-500
`;
const Week = tw.div`
h-8 
flex 
items-center 
justify-center 
border-r 
border-y
`;
const CalendarContainer = tw.div`
bg-white
rounded-lg 
shadow 
overflow-hidden 
h-full
`;
const HeaderContainer = tw.div`
flex 
justify-between 
py-4 
px-6
`;
const CalendarYear = tw.span`
text-lg 
font-gray-400
`;
const CalendarMonth = tw.span`
text-xl 
font-bold 
ml-2
`;
const DaysContainer = tw.div`
grid 
grid-cols-7
`;
const CalendarDays = tw.div`
h-28 
flex 
flex-col 
border-b 
border-r 
px-2 
pt-2
`;
const CalendarDay = tw.div`
flex 
font-bold 
inline-flex 
w-6 
h-6 
items-center 
justify-center
text-center`;
