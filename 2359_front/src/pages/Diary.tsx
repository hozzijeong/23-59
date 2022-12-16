import React from 'react';
import tw from 'tailwind-styled-components';

const Content = tw.div`
    w-[768px]
    m-0
    m-auto 
`;

function Diary() {
  return (
    <div>
      <ul>
        {Array.from({ length: 6 }, (_, idx) => idx + 1).map((data) => (
          <li>{data}</li>
        ))}
      </ul>
      <Content>Diary 다이어리</Content>
    </div>
  );
}

export default Diary;
