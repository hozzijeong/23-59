import React from 'react';
import { useRecoilState } from 'recoil';
import { diaryAtom } from 'recoil/diaryAtom';

function TodayQuestion() {
  const [answer, setAnswer] = useRecoilState(diaryAtom);

  const answerChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setAnswer((cur) => ({ ...cur, questionAnswer: value }));
  };

  return (
    <div>
      <p>오늘 하루 어떠셨나요?</p>
      <textarea value={answer.questionAnswer} onChange={answerChangeHandler} />
    </div>
  );
}

export default TodayQuestion;
