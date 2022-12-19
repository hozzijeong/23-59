import React, { useCallback, useMemo, useState, ReactNode } from 'react';
import AccountBook from 'components/diary/AccountBook';
import DiaryComponentsLayout from 'components/diary/DiaryComponentsLayout';
import EmotionDiary from 'components/diary/EmotionDiary';
import TodayQuestion from 'components/diary/TodayQuestion';
import TodoList from 'components/diary/ToDoList';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

interface AbsoluteDivProps {
  isLeft: boolean;
}

type ContentOptionTypes = 'To Do List' | '오늘의 질문' | '감정 일기' | '가계부';

type DiaryContentsPrpos = {
  [key in ContentOptionTypes]: ReactNode;
};

export interface ContentOptionProps {
  id: string;
  title: ContentOptionTypes;
  isChecked: boolean;
}

const TEMP_DATA: ContentOptionProps[] = [
  { id: '1', title: 'To Do List', isChecked: false },
  { id: '2', title: '오늘의 질문', isChecked: false },
  { id: '3', title: '감정 일기', isChecked: false },
  { id: '4', title: '가계부', isChecked: false },
];

function Diary() {
  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>(TEMP_DATA);

  const optionHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setContentOptions((currentOptions) =>
      currentOptions.map((options) => (options.id === id ? { ...options, isChecked: !options.isChecked } : options))
    );
  }, []);

  const contentCheckBox = useMemo(() => {
    return contentOptions.map(({ id, title }) => (
      <li key={id}>
        <input className="text-lg" id={id} type="checkbox" value={title} onChange={optionHandler} />
        <label htmlFor={id}>{title}</label>
      </li>
    ));
  }, [contentOptions, optionHandler]);

  const tableContents = useMemo(() => {
    const filterdContents = contentOptions.filter(({ isChecked }) => isChecked);
    return filterdContents.map(({ title }) => (
      <li key={title}>
        <a href={`#${title.replaceAll(' ', '-')}`}>{title}</a>
      </li>
    ));
  }, [contentOptions]);

  const diaryContents = useMemo(
    () =>
      contentOptions.every((options) => options.isChecked === false)
        ? '좌측 옵션을 선택해주세요'
        : contentOptions.map((options) => {
            const { title, isChecked } = options;
            if (!isChecked) return null;

            const diaryContentMap: DiaryContentsPrpos = {
              'To Do List': <TodoList />,
              '오늘의 질문': <TodayQuestion />,
              '감정 일기': <EmotionDiary />,
              가계부: <AccountBook />,
            };

            return <DiaryComponentsLayout contents={options}>{diaryContentMap[title]}</DiaryComponentsLayout>;
          }),
    [contentOptions]
  );

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

const DiarySection = tw.section`
  w-full
`;

const HeadContent = tw.div`
  max-w-screen-md
  my-0
  mx-auto
  pt-[5rem]
`;

const Content = tw.div`
  max-w-screen-md
  mt-[5rem]
  md-0
  mx-auto
  text-lg	
`;

const Title = tw.p`
  text-5xl
  font-extrabold
  break-keep	
`;

const RelativeDiv = tw.div`
  relative
`;

const AbsoluteDiv = tw.div<AbsoluteDivProps>`
  absolute
  ${(props) => (props.isLeft ? 'left-[-7.5rem]' : 'right-0')}
  mt-12

`;

const Ullists = styled.ul`
  li {
    display: flex;
    align-content: center;
    font-size: 14px;
  }
`;

const FixedUl = tw(Ullists)`
  fixed
`;
