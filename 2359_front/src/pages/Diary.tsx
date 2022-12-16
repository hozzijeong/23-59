import React from 'react';
import tw from 'tailwind-styled-components';

const DiarySection = tw.section`
  w-full
`;

const HeadContent = tw.div`
  max-w-screen-md
  my-0
  mx-auto
  pt-[8rem]
`;
const Content = tw.div`
  max-w-screen-md
  my-0
  mx-auto 
`;

const Title = tw.p`
  text-[4.8rem]
  font-extrabold
  break-keep	
`;

const RelativeDiv = tw.div`
  relative
`;

const AbsoluteDiv = tw.div`
  absolute  
`;

const TEMP_DATA = [
  { id: '1', content: 'To-Do-List' },
  { id: '2', content: '오늘의 질문' },
  { id: '3', content: '감정 일기' },
  { id: '4', content: '가계부' },
];

function Diary() {
  return (
    <DiarySection>
      <HeadContent>
        <Title>title</Title>
        <RelativeDiv>
          <AbsoluteDiv>
            <ul>
              {TEMP_DATA.map(({ id, content }) => (
                <li key={id}>
                  <input id={id} type="checkbox" value={content} />
                  <label htmlFor={id}>{content}</label>
                </li>
              ))}
            </ul>
          </AbsoluteDiv>
        </RelativeDiv>
      </HeadContent>
      <Content>Diary 다이어리</Content>
    </DiarySection>
  );
}

export default Diary;
