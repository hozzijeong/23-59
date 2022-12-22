/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState, ReactNode, useEffect } from 'react';
import { AccountBook } from 'components/diary/AccountBook';
import { DiaryComponentsLayout } from 'components/diary/Layout/DiaryComponentsLayout';
import { Emotion } from 'components/diary/Emotion';
import { Diary as TodayDiary } from 'components/diary/Diary';
import { TodayQuestion } from 'components/diary/TodayQuestion';
import { TodoList } from 'components/diary/ToDoList';
import { ContentOptions } from 'components/diary/ContentOptions';
import tw from 'tailwind-styled-components';
import { useRecoilValue } from 'recoil';
import { accountTableAtom, questionAnswer, todayTodo, emotionAtom, todayDiaryAtom } from 'recoil/diaryAtom';
import uuid from 'react-uuid';
import Button from 'components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryMode, OptionEnums as OPTION } from 'types/enums';
import { useUserOptions } from 'hooks/useUserOptions';
import { useTodayDiary } from 'hooks/useTodayDiary';
import { useSWRConfig } from 'swr';
import { baseAxios } from 'api';
import { convertDiaryTitleToKor } from 'utilities/convertDiaryTitle';

type DiaryContentsPrpos = {
  [key in OPTION]: ReactNode;
};

function Diary() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState(id);

  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (id === undefined) {
      navigation('/');
      return;
    }
    setDate(convertDiaryTitleToKor(id));
  }, [date, id, navigation]);

  const { contentOptions, setContentOptions } = useUserOptions(); // 유저들 옵션 처리

  const { todayDiary, setTodayDiary } = useTodayDiary(id ?? ''); // 해당 유저의 날짜 얻기. 이 hooks 안에서 state 정리해서 넘겨줄 것.
  // 여기서 체크되는 값들이 contentOption에도 적용이 되어야 하는데,, 흠,,,
  const { diaryInfo, diaryMode } = todayDiary;

  const todayTodoState = useRecoilValue(todayTodo);
  const questionAnswerState = useRecoilValue(questionAnswer);
  const emotionState = useRecoilValue(emotionAtom);
  const todayDiaryState = useRecoilValue(todayDiaryAtom);
  const accountTableAtomState = useRecoilValue(accountTableAtom);

  const everyUnChecked = useMemo(
    () => contentOptions.every((options) => options.isChecked === false),
    [contentOptions]
  );

  const diaryContents = useMemo(() => {
    // 처음 페이지 & isRead 라면 작성하기 보여줄 것.
    if (diaryMode === DiaryMode.CREATE)
      return (
        <EmptyContainer>
          <button type="button" onClick={() => setTodayDiary((prev) => ({ ...prev, diaryMode: DiaryMode.UPDATE }))}>
            작성하기
          </button>
        </EmptyContainer>
      );

    if (diaryMode === DiaryMode.UPDATE && everyUnChecked) {
      return <EmptyContainer>좌측 옵션을 선택해주세요.</EmptyContainer>;
    }

    if (diaryMode === DiaryMode.READ && everyUnChecked) {
      return <EmptyContainer>작성된 내용이 없습니다.</EmptyContainer>;
    }

    // 기본적으로 값
    return contentOptions.map((options) => {
      const { title, isChecked } = options;
      if (!isChecked) return null;

      const diaryContentMap: DiaryContentsPrpos = {
        [OPTION.TODO_LIST]: <TodoList />,
        [OPTION.TODAY_QUESTION]: <TodayQuestion />,
        [OPTION.EMOTION]: <Emotion />,
        [OPTION.DIARY]: <TodayDiary />,
        [OPTION.ACCOUNT_BOOK]: <AccountBook />,
      };

      return (
        <DiaryComponentsLayout key={uuid()} contents={options}>
          {diaryContentMap[title]}
        </DiaryComponentsLayout>
      );
    });
  }, [contentOptions, diaryMode, everyUnChecked, setTodayDiary]);

  const submitHandler = async () => {
    const body = {
      selectedDate: id,
      emotion: emotionState.emotion,
      diary: {
        title: todayDiaryState.title,
        diaryContent: todayDiaryState.content,
      },
      answer: {
        question: '',
        tag: '',
        answer: questionAnswerState.answer,
      },
      todo: todayTodoState,
      account: accountTableAtomState,
    };

    if (diaryInfo?._id === undefined) {
      const sendRequest = baseAxios.post(`/api/contents`, body);
      mutate('/api/contents', sendRequest).then((res) => console.log(res?.data));
      return;
    }

    if (diaryInfo?._id) {
      const sendRequest = baseAxios.patch(`/api/contents/${diaryInfo?._id}`, { ...body, contentId: diaryInfo?._id });
      mutate(`/api/contents/${diaryInfo?._id}`, sendRequest).then((res) => console.log(res?.data));
    }
  };

  const cancelHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('정말 취소하시겠습니까?\n작성하신 내용은 저장되지 않습니다.')) {
      navigation('/');
    }
  };

  const deleteHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('정말 삭제하시겠습니까?\n삭제한 내용은 저장되지 않습니다.')) {
      const ENDPOINT = `/api/contents/${diaryInfo?._id}`;
      const body = {
        contentId: diaryInfo?._id ?? '',
      };

      mutate(
        ENDPOINT,
        baseAxios.delete(ENDPOINT, {
          data: body,
        })
      );
    }
  };

  // Read 페이지를 어떠헥 만들 것인지 생각해보기
  // 처음에 작성 여부에 따라 Empty페이지 보여줄 것.
  // 제일 처음에는 Read 페이지 보여줄 것.
  // 그 다음에 수정하기 누른다면 작성 페이지로 이동할 것.
  return (
    <DiarySection>
      <HeadContent>
        <Title isEmpty={everyUnChecked}>{date}</Title>
        <UpdateDiv>
          {diaryMode === DiaryMode.CREATE && null}
          {diaryMode === DiaryMode.READ && (
            <UpdateButton
              type="button"
              onClick={() => setTodayDiary((prev) => ({ ...prev, diaryMode: DiaryMode.UPDATE }))}
            >
              수정하기
            </UpdateButton>
          )}
          {diaryMode !== DiaryMode.CREATE && diaryInfo?._id && (
            <UpdateButton onClick={deleteHandler} type="button">
              삭제하기
            </UpdateButton>
          )}
        </UpdateDiv>
        <ContentOptions state={contentOptions} setState={setContentOptions} diaryMode={diaryMode} />
      </HeadContent>
      <Content>
        {diaryContents}
        {diaryMode !== DiaryMode.READ &&
          (everyUnChecked ? null : (
            <SubmitContainer>
              <Button onClick={cancelHandler} btntype="cancel">
                취소하기
              </Button>
              <Button onClick={submitHandler} btntype="save">
                작성하기
              </Button>
            </SubmitContainer>
          ))}
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
  pt-[3rem]
`;

const UpdateDiv = tw.div`
  w-full
  border-b-2
  border-primaryDark
  text-primaryDark
  pb-1
  text-right
`;

const UpdateButton = tw.button`
  mx-[10px]
  hover:font-semibold
  hover:text-primaryDeepDark
`;

const Content = tw.div`
  max-w-screen-md
  mt-[3rem]
  md-0
  mx-auto
  text-lg	
`;

const Title = tw.p<{ isEmpty: boolean }>`
  text-4xl
  font-extrabold
  break-keep	
  ${(props) => props.isEmpty && 'text-gray-500'}
  
`;

const EmptyContainer = tw.div`
  flex
  w-full
  h-24
  justify-center
  items-center
  text-2xl
  font-semibold
  text-gray-500
`;

const SubmitContainer = tw.div`
  flex
  justify-between
  mt-[20px]
  pb-[40px]
`;
