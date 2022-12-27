/* eslint-disable no-underscore-dangle */
import { getRandomQuestion } from 'api';
import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { questionAtom } from 'recoil/diaryAtom';
import useSWR from 'swr';
import tw from 'tailwind-styled-components';
import { DiaryMode } from 'types/enums';
import { DiaryComponentPrpos, RandomQuestionProps } from 'types/interfaces';

function TodayQuestion({ todayDiary }: DiaryComponentPrpos) {
  const { diaryMode } = todayDiary;
  const [qna, setQna] = useRecoilState(questionAtom);

  const { data: question, isLoading } = useSWR<RandomQuestionProps>('/api/questions/random', getRandomQuestion, {
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    onSuccess: (data) => {
      setQna((prev) => ({
        ...prev,
        question: diaryMode === DiaryMode.CREATE ? data.item : prev.question,
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
        _id: diaryMode === DiaryMode.CREATE ? question._id : prev._id,
        question: diaryMode === DiaryMode.CREATE ? question.item : prev.question,
        answer: value,
      }));
    },
    [diaryMode, question, setQna]
  );

  if (isLoading) return <div>is Loading... </div>;

  return (
    <div>
      {question && <Question>{diaryMode === DiaryMode.CREATE ? question.item : qna.question}</Question>}
      {diaryMode === DiaryMode.READ ? (
        <div>{qna.answer}</div>
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
