import React, { useMemo, useState, ReactNode } from 'react';
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
  { id: '1', title: 'To Do List', isChecked: true },
  { id: '2', title: '오늘의 질문', isChecked: true },
  { id: '3', title: '감정 일기', isChecked: false },
  { id: '4', title: '가계부', isChecked: false },
];

function Diary() {
  // 여기 체크 상태 데이터는 서버에서 유저가 체크해 놓은 데이터를 받아오면 됨.
  // 그리고 그 받아온 데이터를 useState를 통해 변환하면 된다 생각함.
  // 결국에 서버에서 받아오는 이유는 같은 방법을 사용하지 않기 위함이니까

  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>(TEMP_DATA);

  const diaryContents = useMemo(() => {
    if (contentOptions.every((options) => options.isChecked === false)) {
      return '좌측 옵션을 선택해주세요';
    }

    return contentOptions.map((options) => {
      const { title, isChecked } = options;
      if (!isChecked) return null;

      const diaryContentMap: DiaryContentsPrpos = {
        'To Do List': <TodoList />,
        '오늘의 질문': <TodayQuestion />,
        '감정 일기': <EmotionDiary />,
        가계부: <AccountBook />,
      };

      return <DiaryComponentsLayout contents={options}>{diaryContentMap[title]}</DiaryComponentsLayout>;
    });
  }, [contentOptions]);

  return (
    <DiarySection>
      <HeadContent>
        <Title>Title</Title>
        <ContentOptions state={contentOptions} setState={setContentOptions} />
      </HeadContent>
      <Content>
        {diaryContents}
        {contentOptions.every((options) => options.isChecked === false) ? null : (
          <div>
            <button type="button">취소하기</button>
            <button type="button">작성하기</button>
          </div>
        )}
      </Content>
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
