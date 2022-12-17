import React, { useMemo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { diaryAtom, emotionTypes } from 'recoil/diaryAtom';

const EMOTION_STATE = ['Very Bad', 'Bad', 'SoSo', 'Good', 'Very Good'];

function EmotionDiary() {
  const [{ emotionRecord }, setEmotionRecord] = useRecoilState(diaryAtom);

  const emotionChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;
      if (target instanceof HTMLInputElement) {
        setEmotionRecord((cur) => ({
          ...cur,
          emotionRecord: { ...cur.emotionRecord, emotionState: target.value as emotionTypes },
        }));
      }

      if (target instanceof HTMLTextAreaElement) {
        setEmotionRecord((cur) => ({
          ...cur,
          emotionRecord: { ...cur.emotionRecord, emotionDiary: target.value },
        }));
      }
    },
    [setEmotionRecord]
  );

  const emotionRadio = useMemo(
    () =>
      EMOTION_STATE.map((emotion) => {
        const { emotionState } = emotionRecord;
        return (
          <li key={emotion}>
            <input
              checked={emotionState === emotion}
              id={emotion}
              type="radio"
              name="emotion"
              value={emotion}
              onChange={emotionChangeHandler}
            />
            <label htmlFor={emotion}>{emotion}</label>
          </li>
        );
      }),
    [emotionChangeHandler, emotionRecord]
  );

  return (
    <div>
      <div>
        <p>오늘 하루 어떠셨는지 감정으로 남겨주세요.</p>
        <ul>{emotionRadio}</ul>
      </div>
      <div>
        <p>오늘 하루 무슨 일이 있었는지 남겨주세요.</p>
        <textarea value={emotionRecord.emotionDiary} onChange={emotionChangeHandler} />
      </div>
    </div>
  );
}

export default EmotionDiary;
