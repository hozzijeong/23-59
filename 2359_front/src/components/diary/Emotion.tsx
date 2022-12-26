import React, { useCallback, useMemo } from 'react';
import { EMOTIONS } from 'types/enumConverter';
import { DiaryMode, emotionEnums as EMOTION } from 'types/enums';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import { DiaryComponentPrpos } from 'types/interfaces';
import { Question } from './TodayQuestion';

const EMOTION_STATE = Object.values(EMOTION);

function Emotion({ todayDiary, setTodayDiary }: DiaryComponentPrpos) {
  const { diaryInfo, diaryMode } = todayDiary;

  const emotionChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;

      if (target.type === 'radio') {
        setTodayDiary((prev) => ({
          ...prev,
          diaryInfo: {
            ...prev.diaryInfo,
            emotion: target.value as EMOTION,
          },
        }));
      }
    },
    [setTodayDiary]
  );

  const readMode = diaryMode === DiaryMode.READ;

  const emotionRadio = useMemo(
    () =>
      EMOTION_STATE.map((state) => {
        return (
          <li key={uuid()}>
            <input
              checked={diaryInfo.emotion === state}
              id={state}
              type="radio"
              name="emotion"
              value={state}
              onChange={emotionChangeHandler}
              disabled={readMode}
            />
            <label htmlFor={state}>{EMOTIONS[state]}</label>
          </li>
        );
      }),
    [diaryInfo.emotion, readMode, emotionChangeHandler]
  );

  return (
    <div>
      <Question>오늘 하루 어떠셨는지 감정으로 남겨주세요.</Question>
      <EmotionUl>{emotionRadio}</EmotionUl>
    </div>
  );
}

export { Emotion };

const EmotionUl = tw.ul`
  flex
  justify-between
`;
