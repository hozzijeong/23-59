import React, { useMemo, useCallback } from 'react';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { emotionRecord } from 'recoil/diaryAtom';
import { useSWRConfig } from 'swr';
import { EMOTIONS } from 'types/enumConverter';
import { emotionEnums as EMOTION } from 'types/enums';

const EMOTION_STATE = Object.values(EMOTION);

function EmotionDiary() {
  const [emotion, setEmotion] = useRecoilState(emotionRecord);

  const emotionChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;
      if (target instanceof HTMLInputElement) {
        console.log(target.type);
        if (target.type === 'radio') {
          setEmotion((cur) => ({
            ...cur,
            emotionState: target.value as EMOTION,
          }));
        } else if (target.type === 'text') {
          setEmotion((cur) => ({
            ...cur,
            emotionDiary: {
              ...cur.emotionDiary,
              title: target.value,
            },
          }));
        }
      }

      if (target instanceof HTMLTextAreaElement) {
        setEmotion((cur) => ({
          ...cur,
          emotionDiary: {
            ...cur.emotionDiary,
            content: target.value,
          },
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>오늘 하루 무슨 일이 있었는지 남겨주세요.</p>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          defaultValue={emotion.emotionDiary.title}
          onChange={emotionChangeHandler}
        />
        <textarea defaultValue={emotion.emotionDiary.content} onChange={emotionChangeHandler} />
      </div>
    </div>
  );
}

export { EmotionDiary };
