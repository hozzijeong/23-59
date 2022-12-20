import React, { useMemo, useState, ReactNode } from 'react';
import AccountBook from 'components/diary/AccountBook';
import DiaryComponentsLayout from 'components/diary/Layout/DiaryComponentsLayout';
import EmotionDiary from 'components/diary/EmotionDiary';
import TodayQuestion from 'components/diary/TodayQuestion';
import TodoList from 'components/diary/ToDoList';
import ContentOptions from 'components/diary/ContentOptions';
import tw from 'tailwind-styled-components';
import { useRecoilValue } from 'recoil';
import { accountTableAtom, emotionRecord, questionAnswer, todayTodo } from 'recoil/diaryAtom';
import uuid from 'react-uuid';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

enum OptionEnums {
  TODO_LIST = 'TODO_LIST',
  TODAY_QUESTION = 'TODAY_QUESTION',
  EMOTION_DIARY = 'EMOTION_DIARY',
  ACCOUNT_BOOK = 'ACCOUNT_BOOK',
}

export const CONTENT_OPTION = {
  [OptionEnums.TODO_LIST]: 'To Do List',
  [OptionEnums.TODAY_QUESTION]: '오늘의 질문',
  [OptionEnums.EMOTION_DIARY]: '감정 일기',
  [OptionEnums.ACCOUNT_BOOK]: '가계부',
};

type DiaryContentsPrpos = {
  [key in OptionEnums]: ReactNode;
};

// 해당 상태관리를 할 때 현재 해당 옵션이 체크되었는지 아닌지가 중요함.
//
interface OptionProps {
  id: string;
  title: OptionEnums;
}

export interface ContentOptionProps extends OptionProps {
  isChecked: boolean;
}

const TEMP_DATA: OptionProps[] = [
  { id: '1', title: OptionEnums.TODO_LIST },
  { id: '2', title: OptionEnums.TODAY_QUESTION },
  { id: '3', title: OptionEnums.EMOTION_DIARY },
  { id: '4', title: OptionEnums.ACCOUNT_BOOK },
];

const TEMP_OPTIONS = ['1', '2'];

function Diary() {
  // 여기 체크 상태 데이터는 서버에서 유저가 체크해 놓은 데이터를 받아오면 됨.
  // 그리고 그 받아온 데이터를 useState를 통해 변환하면 된다 생각함.
  // 결국에 서버에서 받아오는 이유는 같은 방법을 사용하지 않기 위함이니까
  // 서버에 데이터를 받아옴.
  // 옵션 목록이 따로 있고, 체크 여부가 따로 존재함.
  // 그렇게 2개를 따로 받아오기
  const navigation = useNavigate();
  const mixedData = useMemo(
    () => TEMP_DATA.map((data) => ({ ...data, isChecked: TEMP_OPTIONS.includes(data.id) })),
    []
  ); // 이렇게 따로 변수로 합쳐서 만들어도 되는지? 클라이언트에서만 사용되는 값들이고, 사용자가 화면에서 동적으로 변경했을 때 그 변경되는 값을 바로바로 적용해줘야 합니다.

  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>(mixedData);
  const todayTodoState = useRecoilValue(todayTodo);
  const questionAnswerState = useRecoilValue(questionAnswer);
  const emotionRecordState = useRecoilValue(emotionRecord);
  const accountTableAtomState = useRecoilValue(accountTableAtom);

  const diaryContents = useMemo(() => {
    if (contentOptions.every((options) => options.isChecked === false)) {
      return '좌측 옵션을 선택해주세요';
    }

    return contentOptions.map((options) => {
      const { title, isChecked } = options;
      if (!isChecked) return null;

      const diaryContentMap: DiaryContentsPrpos = {
        [OptionEnums.TODO_LIST]: <TodoList />,
        [OptionEnums.TODAY_QUESTION]: <TodayQuestion />,
        [OptionEnums.EMOTION_DIARY]: <EmotionDiary />,
        [OptionEnums.ACCOUNT_BOOK]: <AccountBook />,
      };

      return (
        <DiaryComponentsLayout key={uuid()} contents={options}>
          {diaryContentMap[title]}
        </DiaryComponentsLayout>
      );
    });
  }, [contentOptions]);

  const submitHandler = () => {
    console.log(todayTodoState, questionAnswerState, emotionRecordState, accountTableAtomState);
  };
  const cancelHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('정말 취소하시겠습니까?\n 작성하신 내용은 저장되지 않습니다.')) {
      navigation('/');
    }
  };

  return (
    <DiarySection>
      <HeadContent>
        <Title>Title</Title>
        <ContentOptions state={contentOptions} setState={setContentOptions} />
      </HeadContent>
      <Content>
        {diaryContents}
        {contentOptions.every((options) => options.isChecked === false) ? null : (
          <SubmitContainer>
            <Button onClick={cancelHandler} btntype="cancel">
              취소하기
            </Button>
            <Button onClick={submitHandler} btntype="save">
              작성하기
            </Button>
          </SubmitContainer>
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

const SubmitContainer = tw.div`
  flex
  justify-between
  mt-[20px]

`;
