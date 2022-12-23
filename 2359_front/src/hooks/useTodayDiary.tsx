/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { baseAxios } from 'api';
import useSWR from 'swr';
import { DiaryStateProps, TodayDiaryProps } from 'types/interfaces';
import { DiaryMode, emotionEnums } from 'types/enums';
import { INITIAL_DIARY_INFO } from 'utilities/initialValues';

const END_POINT = 'api/contents/date';

const initialDiary = {
  diaryInfo: INITIAL_DIARY_INFO,
  diaryMode: DiaryMode.CREATE,
};
function useTodayDiary(date: string) {
  const [todayDiary, setTodayDiary] = useState<TodayDiaryProps>(initialDiary);

  const { data } = useSWR<DiaryStateProps[]>(
    `${END_POINT}/${date}`,
    () => baseAxios.get(`${END_POINT}/${date}`).then((res) => res.data),
    {
      onSuccess: (data) => {
        const diaryInfo = data[0] ?? null;
        if (!diaryInfo?._id) {
          setTodayDiary((prev) => ({ ...prev, diaryMode: DiaryMode.CREATE }));
        } else {
          setTodayDiary({ diaryInfo, diaryMode: DiaryMode.READ });
        }
      },
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { todayDiary, setTodayDiary };
}

export { useTodayDiary };
