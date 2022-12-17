import React, { useState } from 'react';
import { format, subMonths, addMonths } from 'date-fns';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import { CalendarWeeks, dayColor, takeMonth, todayColor } from './Utils';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate);

  const data = takeMonth(currentDate)();
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
          {week.map((day) => (
            <CalendarDays key={day.toString()} className={`${todayColor(day)}`} onClick={() => setSelectedDate(day)}>
              <CalendarDay className={`${dayColor(day, currentDate)}`}>{format(day, 'dd')}</CalendarDay>
            </CalendarDays>
          ))}
        </DaysContainer>
      ))}
    </CalendarContainer>
  );
}
export default Calendar;

const CalendarBtn = tw.button`
text-lg
border 
rounded-lg 
px-2
bg-primary
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
