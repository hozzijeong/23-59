import React from 'react';
import { useRecoilState } from 'recoil';
import { questionAnswer } from 'recoil/diaryAtom';
import tw from 'tailwind-styled-components';
import { DiaryMode } from 'types/enums';
import { DiaryComponentPrpos } from 'types/interfaces';

function TodayQuestion({ todayDiary, setTodayDiary }: DiaryComponentPrpos) {
  const [{ answer }, setAnswer] = useRecoilState(questionAnswer);
  const { diaryInfo, diaryMode } = todayDiary;

  const answerChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTodayDiary({
      diaryMode,
      diaryInfo: {
        ...diaryInfo,
        answer: {
          question: '',
          tag: '',
          answer: value,
        },
      },
    });
    setAnswer({ answer: value });
  };

  return (
    <div>
      <Question>{diaryMode === DiaryMode.READ ? diaryInfo.answer.question : '오늘 하루 어떠셨나요?'}</Question>
      {diaryMode === DiaryMode.READ ? (
        <div>{diaryInfo.answer.answer}</div>
      ) : (
        <AnswerArea defaultValue={answer} onChange={answerChangeHandler} />
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
