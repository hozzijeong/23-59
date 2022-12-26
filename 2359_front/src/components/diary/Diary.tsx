import React, { useCallback } from 'react';
import tw from 'tailwind-styled-components';
import { DiaryMode } from 'types/enums';
import { DiaryComponentPrpos } from 'types/interfaces';
import { Question } from './TodayQuestion';

function Diary({ todayDiary, setTodayDiary }: DiaryComponentPrpos) {
  const { diaryInfo, diaryMode } = todayDiary;

  const diaryChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;
      if (target instanceof HTMLInputElement) {
        setTodayDiary((prev) => ({
          ...prev,
          diaryInfo: {
            ...prev.diaryInfo,
            diary: {
              ...prev.diaryInfo.diary,
              title: target.value,
            },
          },
        }));
      }

      if (target instanceof HTMLTextAreaElement) {
        setTodayDiary((prev) => ({
          ...prev,
          diaryInfo: {
            ...prev.diaryInfo,
            diary: {
              ...prev.diaryInfo.diary,
              diaryContent: target.value,
            },
          },
        }));
      }
    },
    [setTodayDiary]
  );

  const readMode = diaryMode === DiaryMode.READ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Question>오늘 하루 무슨 일이 있었는지 남겨주세요.</Question>
      {readMode ? (
        <div>
          <p>{diaryInfo.diary.title}</p>
          <div>{diaryInfo.diary.diaryContent}</div>
        </div>
      ) : (
        <div>
          <DiaryTitle
            type="text"
            placeholder="제목을 입력해주세요"
            defaultValue={diaryInfo.diary.title}
            onChange={diaryChangeHandler}
          />
          <DiaryArea defaultValue={diaryInfo.diary.diaryContent} onChange={diaryChangeHandler} />
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
