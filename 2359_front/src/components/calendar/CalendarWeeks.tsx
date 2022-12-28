import React from 'react';
import tw from 'tailwind-styled-components';
import { weekColor } from 'utilities/date';

export function CalendarWeeks() {
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <Weeks>
      {weeks.map((week) => (
        <Week key={week} className={weekColor(week)}>
          {week}
        </Week>
      ))}
    </Weeks>
  );
}

export const Weeks = tw.div`
  grid 
  grid-cols-7 
  text-gray-500
  `;
export const Week = tw.div`
  h-8 
  flex 
  items-center 
  justify-center 
  border-r 
  border-y
  `;
