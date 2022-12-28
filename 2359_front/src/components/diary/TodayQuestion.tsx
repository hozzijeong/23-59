/* eslint-disable no-underscore-dangle */
import { getRandomQuestion } from 'api';
import React, { useCallback, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { questionAtom } from 'recoil/diaryAtom';
import useSWR from 'swr';
import tw from 'tailwind-styled-components';
import { DiaryMode } from 'types/enums';
import { DiaryComponentPrpos, RandomQuestionProps } from 'types/interfaces';

function TodayQuestion({ todayDiary }: DiaryComponentPrpos) {
  const { diaryMode } = todayDiary;
  const [qna, setQna] = useRecoilState(questionAtom);
  const { id } = useParams();

  const { data: question, isLoading } = useSWR<RandomQuestionProps>(`/api/questions/random/${id}`, getRandomQuestion, {
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    suspense: true,
    onSuccess: (data) => {
      // 새로고침 했을 때 새로운 값을 불러오게됨.
      // MODE가 CREATE인 경우에는 data.item을 갖는데, 그게 아니면 이전에 있던 question을 얻는데 여긴 왜그럴까
      // diaryMode가 CREATE가 된다. 데이터를 처음 render 했을 때 값이 CREATE였기 때문에 그렇게 된 것 같음...
      // 즉 onSuccess는 제일 처음 들어가자마자 실행하는데,
      setQna((prev) => ({
        ...prev,
        question: diaryMode === DiaryMode.CREATE && prev.questionId === '' ? data.item : prev.question,
      }));
    },
  });

  /**
   * 렌더링 관련 이슈
   * 전역적으로 사용되는 하나의 상태를 통해 전체 상태를 관리하다보니, 데이터 값이 연속으로 변하는 즉, 렌더링 되는
   * input 이벤트 같은 경우에 끊김 현상이 발생함 -> 이것을 해결하기 위해 전체 input 값 변경을 하기 보다 지역적으로
   *  값을 관리해야 함.
   */

  const answerChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      if (!question) return;
      setQna((prev) => ({
        ...prev,
        questionId: diaryMode === DiaryMode.CREATE ? question._id : prev.questionId,
        question: diaryMode === DiaryMode.CREATE ? question.item : prev.question,
        answer: value,
      }));
    },
    [diaryMode, question, setQna]
  );

  return (
    <div>
      <Suspense fallback={<div className="w-full bg-primaryDark opacity-20 animate-pulse" />}>
        <Question>{diaryMode === DiaryMode.CREATE ? question?.item : qna.question}</Question>
      </Suspense>
      {diaryMode === DiaryMode.READ ? (
        <ReadAnswerDiv>{qna.answer}</ReadAnswerDiv>
      ) : (
        <AnswerArea value={qna.answer} onChange={answerChangeHandler} />
      )}
    </div>
  );
}

export { TodayQuestion, Question };

const Question = tw.p`
  mb-2
  text-lg
  font-semibold
`;

const AnswerArea = tw.textarea`
  w-full
  h-24
  max-h-36
  resize-none
  p-2
  border 
  rounded 
  text-grey-darker
  shadow
`;

const ReadAnswerDiv = tw.div`
  w-full
  h-24
  max-h-36
  resize-none
  p-2
  border 
  rounded 
  text-grey-darker
  shadow
  bg-primaryLight
`;
