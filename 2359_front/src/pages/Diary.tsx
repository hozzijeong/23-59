/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState, ReactNode, useEffect, useCallback } from 'react';
import { AccountBook } from 'components/diary/AccountBook';
import { DiaryComponentsLayout } from 'components/diary/Layout/DiaryComponentsLayout';
import { Emotion } from 'components/diary/Emotion';
import { Diary as TodayDiary } from 'components/diary/Diary';
import { TodayQuestion } from 'components/diary/TodayQuestion';
import { TodoList } from 'components/diary/ToDoList';
import { ContentOptions } from 'components/diary/ContentOptions';
import tw from 'tailwind-styled-components';
import uuid from 'react-uuid';
import Button from 'components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryMode, OptionEnums as OPTION, OptionEnums } from 'types/enums';
import { useTodayDiary } from 'hooks/useTodayDiary';
import { useSWRConfig } from 'swr';
import { createDiary, deleteDiary, updateDiary } from 'api';
import { convertDiaryTitleToKor } from 'utilities/convertDiaryTitle';
import { DiaryBodyProps, OptionCheckedProps } from 'types/interfaces';
import {
  INITIAL_BODY,
  INITIAL_CONTENT_OPTIONS,
  INITIAL_DIARY_INFO,
  INITIAL_TODAY_DIARY,
} from 'utilities/initialValues';
import { useRecoilValue } from 'recoil';
import { accountTableAtom, emotionAtom, questionAtom, todayDiaryAtom, todayTodo } from 'recoil/diaryAtom';

type DiaryContentsPrpos = {
  [key in OPTION]: ReactNode;
};

const setInitialBodySelectedDate = (selectedDate: string) => ({ ...INITIAL_BODY, selectedDate });

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
    window.scrollTo(0, 0);
  }, []);

  const {
    todayDiary,
    setTodayDiary,
    contentOptions,
    setContentOptions,
    mutate: diaryMutate,
    initOptions,
  } = useTodayDiary(id ?? ''); // 해당 유저의 날짜 얻기. 이 hooks 안에서 state 정리해서 넘겨줄 것.
  const { diaryInfo, diaryMode } = todayDiary;

  const todo = useRecoilValue(todayTodo);
  const qna = useRecoilValue(questionAtom);
  const emotion = useRecoilValue(emotionAtom);
  const diary = useRecoilValue(todayDiaryAtom);
  const account = useRecoilValue(accountTableAtom);

  const everyUnChecked = useMemo(() => contentOptions.every((option) => option.isChecked === false), [contentOptions]);

  const diaryContents = useMemo(() => {
    if (diaryMode === (DiaryMode.UPDATE || DiaryMode.CREATE) && everyUnChecked) {
      return <EmptyContainer>좌측 옵션을 선택해주세요.</EmptyContainer>;
    }

    if (diaryMode === DiaryMode.READ && everyUnChecked) {
      return <EmptyContainer>작성된 내용이 없습니다.</EmptyContainer>;
    }

    return contentOptions.map((options) => {
      const { title, isChecked } = options;
      if (!isChecked) return null;

      const diaryContentMap: DiaryContentsPrpos = {
        [OPTION.TODO_LIST]: <TodoList todayDiary={todayDiary} />,
        [OPTION.TODAY_QUESTION]: <TodayQuestion todayDiary={todayDiary} />,
        [OPTION.EMOTION]: <Emotion todayDiary={todayDiary} />,
        [OPTION.DIARY]: <TodayDiary todayDiary={todayDiary} />,
        [OPTION.ACCOUNT_BOOK]: <AccountBook todayDiary={todayDiary} />,
      };

      return (
        <DiaryComponentsLayout key={uuid()} contents={options}>
          {diaryContentMap[title]}
        </DiaryComponentsLayout>
      );
    });
  }, [contentOptions, diaryMode, everyUnChecked, todayDiary]);

  const submitHandler = async () => {
    // 여기서 checkOption을 값을 바꿀 때 isChecked를 false로 해버림
    const isCreateMode = diaryMode === DiaryMode.CREATE;
    /**
     * contentoption이 true인데 값이 없거나
     * contentOption이 false 라면 무조건 값이 없음.
     */
    const { _id, selectedDate } = diaryInfo;

    const body: DiaryBodyProps = contentOptions.reduce((acc, { title, isChecked }) => {
      switch (title) {
        case OptionEnums.ACCOUNT_BOOK:
          if (isChecked && account.length !== 0) {
            return { ...acc, account, checkOption: { ...acc.checkOption, [title]: isChecked } };
          }
          return { ...acc, checkOption: { ...acc.checkOption, [title]: false } };
        case OptionEnums.DIARY:
          if (isChecked && diary.title !== '') {
            // 타이틀만은 무조건 받기
            return { ...acc, diary, checkOption: { ...acc.checkOption, [title]: isChecked } };
          }
          return { ...acc, checkOption: { ...acc.checkOption, [title]: false } };
        case OptionEnums.EMOTION:
          if (isChecked && emotion !== null) {
            return { ...acc, emotion, checkOption: { ...acc.checkOption, [title]: isChecked } };
          }
          return { ...acc, checkOption: { ...acc.checkOption, [title]: false } };
        case OptionEnums.TODAY_QUESTION:
          if (isChecked && qna.answer !== '') {
            return {
              ...acc,
              qna: {
                questionId: qna._id,
                answer: qna.answer,
              },
              checkOption: { ...acc.checkOption, [title]: isChecked },
            };
          }
          return { ...acc, checkOption: { ...acc.checkOption, [title]: false } };
        case OptionEnums.TODO_LIST:
          if (isChecked && todo.length !== 0) {
            return { ...acc, todo, checkOption: { ...acc.checkOption, [title]: isChecked } };
          }
          return { ...acc, checkOption: { ...acc.checkOption, [title]: false } };

        default: {
          return { ...acc };
        }
      }
    }, setInitialBodySelectedDate(isCreateMode ? id ?? '' : selectedDate));

    console.log(body);

    try {
      if (isCreateMode) {
        await mutate('/api/contents', createDiary(body)).then((res) => {
          diaryMutate();
        });
        return;
      }

      await mutate(`/api/contents/${_id}`, updateDiary({ _id, body })).then((res) => diaryMutate());
      setTodayDiary({ diaryInfo: { ...diaryInfo, ...body, qna }, diaryMode: DiaryMode.READ });
    } catch (e) {
      throw Error(`errorOccure ${e}`);
    }
  };

  const cancelHandler = () => {
    const isCreate = diaryMode === DiaryMode.CREATE;
    if (
      confirm(`정말 취소하시겠습니까?\n작성하신 내용은 저장되지 ${isCreate ? '않고 홈으로 이동합니다' : '않습니다'}.`)
    ) {
      if (isCreate) {
        navigation('/');
      } else {
        setTodayDiary((prev) => ({ ...prev, diaryMode: DiaryMode.READ }));
      }
      // navigation('/');
    }
  };

  const deleteHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('정말 삭제하시겠습니까?\n삭제한 내용은 저장되지 않습니다.')) {
      mutate(`/api/contents/${diaryInfo._id}`, deleteDiary(diaryInfo._id)).then((res) => {
        if (!initOptions) return;
        diaryMutate([{ ...INITIAL_DIARY_INFO, checkOption: initOptions }]);
      });
      navigation('/');
    }
  };

  return (
    <DiarySection>
      <HeadContent>
        <Title isempty={everyUnChecked}>{date}</Title>
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
          {diaryMode === DiaryMode.READ && (
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
  pb-[2.5rem]
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

const Title = tw.p<{ isempty: boolean }>`
  text-4xl
  font-extrabold
  break-keep	
  ${(props) => props.isempty && 'text-gray-500'}
  
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
`;
