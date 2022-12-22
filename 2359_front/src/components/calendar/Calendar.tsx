import React, { useState } from 'react';
import { format, subMonths, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import calendarPage from 'recoil/calendarAtom';
import DiarySummary from './DiarySummary';
import { CalendarWeeks, dayColor, takeMonth, todayColor } from './Utils';
import DiarySum from './DiarySum';

function Calendar() {
  const [currentDate, setCurrentDate] = useRecoilState(calendarPage);
  const navigate = useNavigate();
  console.log('currentDate', currentDate);
  const MonthStart = format(startOfMonth(currentDate), 'yyyyMMdd');
  const MonthEnd = format(endOfMonth(currentDate), 'yyyyMMdd');
  const MonthDate = `${MonthStart}-${MonthEnd}`;
  console.log(MonthDate);

  const data = takeMonth(currentDate)();
  const curMonth = () => {
    setCurrentDate(new Date());
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const onDateClick = (day: Date) => {
    const diaryId = format(day, 'yyyyMMdd');

    setCurrentDate(day);
    navigate(`/diary/${diaryId}`);
  };

  return (
    <CalendarContainer>
      <HeaderContainer>
        <div>
          <CalendarYear>{format(currentDate, 'yyyy')}년</CalendarYear>
          <CalendarMonth>{format(currentDate, 'M')}월</CalendarMonth>
        </div>
        <div className="flex">
          <Button btntype="basic" onClick={curMonth}>
            오늘
          </Button>
          <Button btntype="save" onClick={prevMonth}>
            이전
          </Button>
          <Button btntype="save" onClick={nextMonth}>
            다음
          </Button>
        </div>
      </HeaderContainer>
      <CalendarWeeks />
      {data.map((week: Date[]) => (
        <DaysContainer key={uuid()}>
          {week.map((day: Date) => (
            <CalendarDays key={day.toString()} className={`${todayColor(day)}`} onClick={() => onDateClick(day)}>
              <CalendarDay className={`${dayColor(day, currentDate)}`}>{format(day, 'dd')}</CalendarDay>
              <DiarySum date={MonthDate} day={format(day, 'yyyyMMdd')} />
            </CalendarDays>
          ))}
        </DaysContainer>
      ))}
    </CalendarContainer>
  );
}
export default Calendar;

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
py-6
px-6
`;
const CalendarYear = tw.span`
text-lg
font-gray-400
`;
const CalendarMonth = tw.span`
text-2xl
font-bold 
ml-2
`;
const DaysContainer = tw.div`
grid 
grid-cols-7
`;
const CalendarDays = tw.div`
cursor-pointer
h-28
flex 
flex-col 
border-b 
border-r 
px-2 
pt-2
relative

hover:bg-primaryDark
active:bg-primary
transition-colors ease-in-out duration-300
`;

const CalendarDay = tw.div`
flex 
font-bold 
inline-flex 
w-5
h-5
items-center 
justify-center
text-center
`;
