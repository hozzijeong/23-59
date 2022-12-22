import { useState } from 'react';
import { baseAxios } from 'api';
import useSWR from 'swr';
import { DiaryStateProps } from 'types/interfaces';
import { DiaryMode } from 'types/enums';

interface TodayDiaryProps {
  diaryInfo: DiaryStateProps | null;
  diaryMode: DiaryMode;
}
const END_POINT = 'api/contents/date';
const initialDiary = {
  diaryInfo: null,
  diaryMode: DiaryMode.CREATE,
};
function useTodayDiary(date: string) {
  const [todayDiary, setTodayDiary] = useState<TodayDiaryProps>(initialDiary);

  const { data } = useSWR<DiaryStateProps[]>(
    `${END_POINT}/${date}`,
    () => baseAxios.get(`${END_POINT}/${date}`).then((res) => res.data),
    {
      onSuccess: (data) => {
        setTodayDiary((prev) => ({ ...prev, diaryInfo: data[0] }));
      },
    }
  );
  return { todayDiary, setTodayDiary };
}

export { useTodayDiary };
