import { Content } from 'pages/Diary';
import React from 'react';
import tw from 'tailwind-styled-components';
import uuid from 'react-uuid';

interface DiarySkeletonProps {
  stateLength: number;
}

function DiarySkeleton({ stateLength }: DiarySkeletonProps) {
  return (
    <Content>
      {Array.from({ length: stateLength }).map(() => (
        <TodoBoxes key={uuid()} />
      ))}
    </Content>
  );
}

export { DiarySkeleton };

const TodoBoxes = tw.div`
  mt-[1rem]
  rounded 
  shadow 
  p-6 
  mx-auto
  my-4
  w-full 
  h-[240px]
  bg-primaryDark
  opacity-20
  lg:w-11/12
`;
