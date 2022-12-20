import React from 'react';
import { useRecoilState } from 'recoil';
import { questionAnswer } from 'recoil/diaryAtom';

function TodayQuestion() {
  const [{ answer }, setAnswer] = useRecoilState(questionAnswer);

  const answerChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setAnswer({ answer: value });
  };

  return (
    <div>
      <p>오늘 하루 어떠셨나요?</p>
      <textarea defaultValue={answer} onChange={answerChangeHandler} />
    </div>
  );
}

export { TodayQuestion };
