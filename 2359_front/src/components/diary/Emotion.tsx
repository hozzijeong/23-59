import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { emotionAtom } from 'recoil/diaryAtom';
import { EMOTIONS } from 'types/enumConverter';
import { emotionEnums as EMOTION } from 'types/enums';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import { Question } from './TodayQuestion';

const EMOTION_STATE = Object.values(EMOTION);

function Emotion() {
  const [{ emotion }, setEmotion] = useRecoilState(emotionAtom);

  const emotionChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      if (target.type === 'radio') {
        setEmotion({ emotion: target.value as EMOTION });
      }
    },
    [setEmotion]
  );

  const emotionRadio = useMemo(
    () =>
      EMOTION_STATE.map((state) => {
        return (
          <li key={uuid()}>
            <input
              checked={emotion === state}
              id={state}
              type="radio"
              name="emotion"
              value={state}
              onChange={emotionChangeHandler}
            />
            <label htmlFor={state}>{EMOTIONS[state]}</label>
          </li>
        );
      }),
    [emotion, emotionChangeHandler]
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
