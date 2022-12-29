/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState, ReactNode, useEffect, useCallback, Suspense } from 'react';
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
import ModalBasic, { ModalBasicProps } from 'components/ModalBasic';
import { useNavigate, useParams } from 'react-router-dom';
import { diaryMode as DiaryMode, option as OPTION } from 'types/enums';
import { useTodayDiary } from 'hooks/useTodayDiary';
import { useSWRConfig } from 'swr';
import { createDiary, deleteDiary, updateDiary } from 'api';
import { convertDiaryTitleToKor } from 'utilities/utils';
import { DiaryBodyProps } from 'types/interfaces';
import { INITIAL_BODY, INITIAL_DIARY_INFO } from 'constant/initialValues';
import { useRecoilValue } from 'recoil';
import { accountTableAtom, emotionAtom, questionAtom, todayDiaryAtom, todayTodo } from 'recoil/diaryAtom';
import { DiarySkeleton } from 'components/skeleton/DiarySkeleton';
import { DeferredComponent } from 'components/skeleton/DeferredComponent';
import { getErrorMessage } from 'utilities/error';

type DiaryContentsPrpos = {
  [key in OPTION]: ReactNode;
};

const setInitialBodySelectedDate = (
  selectedDate: string,
  { questionId, answer }: { questionId: string; answer: string }
) => ({
  ...INITIAL_BODY,
  qna: {
    questionId,
    answer,
  },
  selectedDate,
});

function Diary() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState(id);
  const { mutate } = useSWRConfig();
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState<ModalBasicProps>({ title: '', closeText: '닫기', submitText: '예' });

  const toggleModal = useCallback(() => setShowModal((cur) => !cur), []);

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
        [OPTION.ACCOUNT_BOOK]: (
          <AccountBook todayDiary={todayDiary} setModalProps={setModalProps} toggleModal={toggleModal} />
        ),
      };

      return (
        <DiaryComponentsLayout key={uuid()} contents={options}>
          {diaryContentMap[title]}
        </DiaryComponentsLayout>
      );
    });
  }, [contentOptions, diaryMode, everyUnChecked, todayDiary]);

  const submitHandler = async () => {
    const isCreateMode = diaryMode === DiaryMode.CREATE;

    const { _id, selectedDate } = diaryInfo;
    const { questionId, answer } = qna;
    const body: DiaryBodyProps = contentOptions.reduce((acc, { title, isChecked }) => {
      const checkOption = { ...acc.checkOption, [title]: isChecked };
      const falseOption = { ...acc.checkOption, [title]: false };

      switch (title) {
        case OPTION.ACCOUNT_BOOK:
          if (isChecked && account.length !== 0) {
            return { ...acc, account, checkOption };
          }
          return { ...acc, checkOption: falseOption };
        case OPTION.DIARY:
          if (isChecked && diary.title !== '') {
            // 타이틀만은 무조건 받기
            return { ...acc, diary, checkOption };
          }
          return { ...acc, checkOption: falseOption };
        case OPTION.EMOTION:
          if (isChecked && emotion !== null) {
            return { ...acc, emotion, checkOption };
          }
          return { ...acc, checkOption: falseOption };
        case OPTION.TODAY_QUESTION:
          if (isChecked && qna.answer !== '') {
            return { ...acc, qna: { questionId, answer }, checkOption };
          }
          return { ...acc, checkOption: falseOption };
        case OPTION.TODO_LIST:
          if (isChecked && todo.length !== 0) {
            return { ...acc, todo, checkOption };
          }
          return { ...acc, checkOption: falseOption };

        default: {
          return { ...acc };
        }
      }
    }, setInitialBodySelectedDate(isCreateMode ? id ?? '' : selectedDate, { questionId, answer: '' }));
    const initialDiary = {
      diaryInfo: { ...diaryInfo, ...body, qna },
      diaryMode: DiaryMode.READ,
    };
    try {
      if (Object.values(body.checkOption).every((checked) => !checked))
        throw new Error('적어도 하나 이상의 결산을 작성하셔야 합니다.');
      if (isCreateMode) {
        await mutate('/api/contents', createDiary(body)).then((res) => diaryMutate());
        const title = `일일 결산 등록을 완료했습니다.`;
        setModalProps({
          title,
          submitText: '홈으로',
          submitHandler: () => {
            toggleModal();
            navigation('/');
          },
          closeText: '머무르기',
          cancelHandler: () => {
            setTodayDiary(initialDiary);
            toggleModal();
          },
        });

        toggleModal();
      } else {
        await mutate(`/api/contents/${_id}`, updateDiary({ _id, body })).then((res) => diaryMutate());
        setTodayDiary(initialDiary);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setModalProps({ title: message, closeText: '닫기', cancelHandler: () => toggleModal() });
      toggleModal();
    }
  };

  const deleteModalHandler = () => {
    setModalProps({
      title: '정말 삭제하시겠습니까?\n삭제한 내용은 저장되지 않습니다.',
      submitHandler: () => {
        mutate(`/api/contents/${diaryInfo._id}`, deleteDiary(diaryInfo._id)).then((res) => {
          if (!initOptions) return;
          diaryMutate([
            {
              ...INITIAL_DIARY_INFO,
              qna: {
                questionId: qna.questionId,
                answer: '',
                question: qna.question,
              },
              checkOption: initOptions,
            },
          ]);
        });
        toggleModal();
        navigation('/');
      },
    });
    toggleModal();
  };

  const cancelModalHandler = () => {
    const isCreate = diaryMode === DiaryMode.CREATE;
    setModalProps((prev) => ({
      ...prev,
      title: `정말 취소하시겠습니까?\n작성하신 내용은 저장되지 ${isCreate ? '않고 홈으로 이동합니다' : '않습니다'}.`,
      submitHandler: () => {
        if (isCreate) {
          navigation('/');
        } else {
          setTodayDiary((prev) => ({ ...prev, diaryMode: DiaryMode.READ }));
        }
        toggleModal();
      },
    }));
    toggleModal();
  };

  return (
    <DiarySection>
      {showModal && (
        <ModalBasic
          closeText={modalProps.closeText}
          cancelHandler={toggleModal}
          title={modalProps.title}
          submitText={modalProps.submitText}
          submitHandler={modalProps.submitHandler}
        />
      )}
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
            <UpdateButton onClick={deleteModalHandler} type="button">
              삭제하기
            </UpdateButton>
          )}
        </UpdateDiv>
        <ContentOptions state={contentOptions} setState={setContentOptions} diaryMode={diaryMode} />
      </HeadContent>

      <Suspense
        fallback={
          <DeferredComponent>
            <DiarySkeleton stateLength={contentOptions.filter(({ isChecked }) => isChecked).length} />
          </DeferredComponent>
        }
      >
        <Content>
          {diaryContents}
          {diaryMode !== DiaryMode.READ &&
            (everyUnChecked ? null : (
              <SubmitContainer>
                <Button onClick={cancelModalHandler} btntype="cancel">
                  취소하기
                </Button>
                <Button onClick={submitHandler} btntype="save">
                  {diaryMode === DiaryMode.CREATE ? '작성하기' : '수정하기'}
                </Button>
              </SubmitContainer>
            ))}
        </Content>
      </Suspense>
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

export const Content = tw.div`
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
