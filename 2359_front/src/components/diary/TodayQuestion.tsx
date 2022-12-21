import React from 'react';
import { useRecoilState } from 'recoil';
import { questionAnswer } from 'recoil/diaryAtom';
import tw from 'tailwind-styled-components';

function TodayQuestion() {
  const [{ answer }, setAnswer] = useRecoilState(questionAnswer);

  const answerChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setAnswer({ answer: value });
  };

  return (
    <div>
      <Question>오늘 하루 어떠셨나요?</Question>
      <DiaryArea defaultValue={answer} onChange={answerChangeHandler} />
    </div>
  );
}

export { TodayQuestion };

const Question = tw.p`
  mb-2
  text-xl
  font-semibold
`;

const DiaryArea = tw.textarea`
  w-full
  h-24
`;
