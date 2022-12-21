import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { todayDiaryAtom } from 'recoil/diaryAtom';

function Diary() {
  const [diary, setDiary] = useRecoilState(todayDiaryAtom);

  const diaryChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;
      if (target instanceof HTMLInputElement) {
        setDiary((cur) => ({
          ...cur,
          title: target.value,
        }));
      }

      if (target instanceof HTMLTextAreaElement) {
        setDiary((cur) => ({
          ...cur,
          content: target.value,
        }));
      }
    },
    [setDiary]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p>오늘 하루 무슨 일이 있었는지 남겨주세요.</p>
      <input type="text" placeholder="제목을 입력해주세요" defaultValue={diary.title} onChange={diaryChangeHandler} />
      <textarea defaultValue={diary.content} onChange={diaryChangeHandler} />
    </div>
  );
}

export { Diary };
