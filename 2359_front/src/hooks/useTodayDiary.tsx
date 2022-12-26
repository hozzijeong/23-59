/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { baseAxios } from 'api';
import useSWR from 'swr';
import { DiaryStateProps, TodayDiaryProps } from 'types/interfaces';
import { DiaryMode } from 'types/enums';
import { INITIAL_DIARY_INFO } from 'utilities/initialValues';
import { converUserOptionToContent } from 'utilities/utils';
import { useSetRecoilState } from 'recoil';
import { accountTableAtom, emotionAtom, questionAtom, todayDiaryAtom, todayTodo } from 'recoil/diaryAtom';
import { useUserOptions } from './useUserOptions';

const END_POINT = '/api/contents/date';

const initialDiary = {
  diaryInfo: INITIAL_DIARY_INFO,
  diaryMode: DiaryMode.CREATE,
};
function useTodayDiary(date: string) {
  const { contentOptions, setContentOptions } = useUserOptions(); // 유저들 옵션 처리, 이게 CREATE일 때만 값을 불러오면 됨.
  const [todayDiary, setTodayDiary] = useState<TodayDiaryProps>(initialDiary);

  const { data, mutate } = useSWR<DiaryStateProps[]>(
    `${END_POINT}/${date}`,
    () => baseAxios.get(`${END_POINT}/${date}`).then((res) => res.data),
    {
      onError: (error) => {
        console.log(error, 'error on api/contents/date');
      },
      // revalidateOnMount: false,
      revalidateOnFocus: false,
      // revalidateOnReconnect: false,
      // revalidateIfStale: false,
    }
  );

  /**
   * 1. 데이터가 load 되었을 때 그 안에 있는 checkOption의 값이 나타났으면 좋겠다.
   * 2. diarymode가 READ와 UPDATE라면 data에 있는 현재 체크된 옵션들이 contentOptions르 넘어가게 된되고
   * 3. diaryMode가 create라면 swr을 통해 받은 값들이 contentOption이 된다.
   */
  const setTodo = useSetRecoilState(todayTodo);
  const setQna = useSetRecoilState(questionAtom);
  const setEmotion = useSetRecoilState(emotionAtom);
  const setDiary = useSetRecoilState(todayDiaryAtom);
  const setAccount = useSetRecoilState(accountTableAtom);

  useEffect(() => {
    if (!data) return;
    const info = data[0] ?? null;
    if (!info) {
      setTodayDiary((prev) => ({ ...prev, diaryMode: DiaryMode.CREATE }));
    } else {
      const { todo, qna, emotion, diary, account } = info;
      setTodo(todo);
      setQna(qna);
      setEmotion(emotion);
      setDiary(diary);
      setAccount(account);
      setTodayDiary({ diaryInfo: info, diaryMode: DiaryMode.READ });
    }
  }, [data]);

  useEffect(() => {
    if (todayDiary.diaryMode !== DiaryMode.CREATE) {
      setContentOptions(converUserOptionToContent(todayDiary.diaryInfo.checkOption));
    }
  }, [todayDiary.diaryMode]);

  return { todayDiary, setTodayDiary, contentOptions, setContentOptions, mutate };
}

export { useTodayDiary };
