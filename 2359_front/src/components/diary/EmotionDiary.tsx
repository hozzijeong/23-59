import React, { useMemo, useCallback } from 'react';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { emotionRecord } from 'recoil/diaryAtom';
import { EMOTIONS } from 'types/enumConverter';
import { emotionEnums as EMOTION } from 'types/enums';

const EMOTION_STATE = Object.values(EMOTION);

function EmotionDiary() {
  const [emotion, setEmotion] = useRecoilState(emotionRecord);

  const emotionChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;
      if (target instanceof HTMLInputElement) {
        setEmotion((cur) => ({
          ...cur,
          emotionState: target.value as EMOTION,
        }));
      }

      if (target instanceof HTMLTextAreaElement) {
        setEmotion((cur) => ({
          ...cur,
          emotionDiary: target.value,
        }));
      }
    },
    [setEmotion]
  );

  const emotionRadio = useMemo(
    () =>
      EMOTION_STATE.map((state) => {
        const { emotionState } = emotion;
        return (
          <li key={uuid()}>
            <input
              checked={emotionState === state}
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
      <div>
        <p>오늘 하루 어떠셨는지 감정으로 남겨주세요.</p>
        <ul>{emotionRadio}</ul>
      </div>
      <div>
        <p>오늘 하루 무슨 일이 있었는지 남겨주세요.</p>
        <textarea defaultValue={emotion.emotionDiary} onChange={emotionChangeHandler} />
      </div>
    </div>
  );
}

export { EmotionDiary };
