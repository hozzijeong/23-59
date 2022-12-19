import React, { useCallback, useMemo, useState, ReactNode } from 'react';
import AccountBook from 'components/diary/AccountBook';
import DiaryComponentsLayout from 'components/diary/Layout/DiaryComponentsLayout';
import EmotionDiary from 'components/diary/EmotionDiary';
import TodayQuestion from 'components/diary/TodayQuestion';
import TodoList from 'components/diary/ToDoList';
import tw from 'tailwind-styled-components';
import ContentOptions from 'components/diary/ContentOptions';

type ContentOptionTypes = 'To Do List' | '오늘의 질문' | '감정 일기' | '가계부';

type DiaryContentsPrpos = {
  [key in ContentOptionTypes]: ReactNode;
};

// 해당 상태관리를 할 때 현재 해당 옵션이 체크되었는지 아닌지가 중요함.
//
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
        <ContentOptions state={contentOptions} setState={setContentOptions} />
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
