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
      <AnswerArea defaultValue={answer} onChange={answerChangeHandler} />
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

`;
