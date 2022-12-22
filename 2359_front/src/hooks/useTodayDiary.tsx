import { baseAxios } from 'api';
import useSWR from 'swr';
import { DiaryStateProps } from 'types/interfaces';

const END_POINT = 'api/contents/date';
function useTodayDiary(date: string) {
  const { data } = useSWR<DiaryStateProps[]>(`${END_POINT}/${date}`, () =>
    baseAxios.get(`${END_POINT}/${date}`).then((res) => res.data)
  );

  if (!data) return { data: [] };

  return { isPost: false, isRead: false, data };
}

export { useTodayDiary };
