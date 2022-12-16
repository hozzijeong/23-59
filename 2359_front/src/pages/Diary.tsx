import React, { useCallback, useMemo, useState, ReactNode } from 'react';
import AccountBook from 'components/Diary/AccountBook';
import DiaryComponentsLayout from 'components/Diary/DiaryComponentsLayout';
import EmotionDiary from 'components/Diary/EmotionDiary';
import TodayQuestion from 'components/Diary/TodayQuestion';
import TodoList from 'components/Diary/ToDoList';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

interface AbsoluteProps {
  isLeft: boolean;
}

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
  mt-[5rem]
  md-0
  mx-auto
  text-[1.8rem]
`;

const Title = tw.p`
  text-[4.8rem]
  font-extrabold
  break-keep	
`;

const RelativeDiv = tw.div`
  relative
`;

const AbsoluteDiv = tw.div<AbsoluteProps>`
  absolute
  ${(props) => (props.isLeft ? 'left-[-12rem]' : 'right-0')}
  mt-[5rem]

`;

const Ullists = styled.ul`
  li {
    display: flex;
    align-content: center;
    font-size: 1.4rem;
  }
`;

const FixedUl = tw(Ullists)`
  fixed
`;

export interface ContentOptionProps {
  id: string;
  content: string;
  isChecked: boolean;
}

const TEMP_DATA: ContentOptionProps[] = [
  { id: '1', content: 'To Do List', isChecked: false },
  { id: '2', content: '오늘의 질문', isChecked: false },
  { id: '3', content: '감정 일기', isChecked: false },
  { id: '4', content: '가계부', isChecked: false },
];

function Diary() {
  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>(TEMP_DATA);
  const optionHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id } = event.target;
      setContentOptions((currentOptions) =>
        currentOptions.map((options) => (options.id === id ? { ...options, isChecked: !options.isChecked } : options))
      );
    },
    [contentOptions]
  );

  const contentCheckBox = useMemo(() => {
    return contentOptions.map(({ id, content }) => (
      <li key={id}>
        <input className="text-2rem" id={id} type="checkbox" value={content} onChange={optionHandler} />
        <label htmlFor={id}>{content}</label>
      </li>
    ));
  }, [contentOptions]);

  const tableContents = useMemo(() => {
    const filterdContents = contentOptions.filter(({ isChecked }) => isChecked);
    return filterdContents.map(({ content }) => (
      <li>
        <a href={`#${content.replaceAll(' ', '-')}`}>{content}</a>
      </li>
    ));
  }, [contentOptions]);

  const diaryContents = useMemo(() => {
    return contentOptions.every((options) => options.isChecked === false)
      ? '좌측 옵션을 선택해주세요'
      : contentOptions.map((options) => {
          const { content, isChecked } = options;
          if (!isChecked) return null;
          let currentComponents: ReactNode;
          switch (content) {
            case 'To Do List':
              currentComponents = <TodoList />;
              break;
            case '오늘의 질문':
              currentComponents = <TodayQuestion />;
              break;
            case '감정 일기':
              currentComponents = <EmotionDiary />;
              break;
            case '가계부':
              currentComponents = <AccountBook />;
              break;
            default:
              return null;
          }
          return <DiaryComponentsLayout contents={options}>{currentComponents}</DiaryComponentsLayout>;
        });
  }, [contentOptions]);

  return (
    <DiarySection>
      <HeadContent>
        <Title>Title</Title>
        <RelativeDiv>
          <AbsoluteDiv isLeft>
            <FixedUl>{contentCheckBox}</FixedUl>
          </AbsoluteDiv>
          <AbsoluteDiv isLeft={false}>
            <FixedUl>{tableContents}</FixedUl>
          </AbsoluteDiv>
        </RelativeDiv>
      </HeadContent>
      <Content>{diaryContents}</Content>
    </DiarySection>
  );
}

export default Diary;
