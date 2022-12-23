import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { todayDiaryAtom } from 'recoil/diaryAtom';
import tw from 'tailwind-styled-components';
import { Question } from './TodayQuestion';

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
  const readMode = false;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Question>오늘 하루 무슨 일이 있었는지 남겨주세요.</Question>
      {readMode ? null : (
        <div>
          <DiaryTitle
            type="text"
            placeholder="제목을 입력해주세요"
            defaultValue={diary.title}
            onChange={diaryChangeHandler}
          />
          <DiaryArea defaultValue={diary.content} onChange={diaryChangeHandler} />
        </div>
      )}
    </div>
  );
}

export { Diary };

const DiaryTitle = tw.input`
  shadow 
  appearance-none 
  border 
  rounded 
  w-full
  py-2 
  px-3 
  mb-4 
  text-grey-darker
`;

const DiaryArea = tw.textarea`
  w-full
  h-44
  resize-none
  p-2
  border 
  rounded 
  text-grey-darker
  shadow
`;
