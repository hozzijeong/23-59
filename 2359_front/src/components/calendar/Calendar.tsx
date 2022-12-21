import React, { useState } from 'react';
import { format, subMonths, addMonths } from 'date-fns';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { CalendarWeeks, dayColor, takeMonth, todayColor } from './Utils';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const data = takeMonth(currentDate)();
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const onDateClick = (day: Date) => {
    const diaryId = format(day, 'yyyyMMdd');
    navigate(`/diary/${diaryId}`);
  };

  return (
    <CalendarContainer>
      <HeaderContainer>
        <Button btntype="basic" onClick={prevMonth}>
          이전
        </Button>
        <div>
          <CalendarYear>{format(currentDate, 'yyyy')}년</CalendarYear>
          <CalendarMonth>{format(currentDate, 'M')}월</CalendarMonth>
        </div>
        <Button btntype="basic" onClick={nextMonth}>
          다음
        </Button>
      </HeaderContainer>
      <CalendarWeeks />
      {data.map((week) => (
        <DaysContainer key={uuid()}>
          {week.map((day) => (
            <CalendarDays key={day.toString()} className={`${todayColor(day)}`} onClick={() => onDateClick(day)}>
              <CalendarDay className={`${dayColor(day, currentDate)}`}>{format(day, 'dd')}</CalendarDay>
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

hover:bg-primaryDark
active:bg-primary
transition-colors ease-in-out duration-300
`;
const CalendarDay = tw.div`
flex 
font-bold 
inline-flex 
w-6 
h-6 
items-center 
justify-center
text-center
`;
