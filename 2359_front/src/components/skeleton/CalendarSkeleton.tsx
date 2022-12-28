import React from 'react';
import tw from 'tailwind-styled-components';

function CalendarSkeleton() {
  return <CalenderSkeleton />;
}

export { CalendarSkeleton };

const CalenderSkeleton = tw.div`
  w-[1024px]
  h-[672px]
  rounded-lg 
  shadow 
  overflow-hidden
  bg-primaryDark
  opacity-20
  my-16
`;
