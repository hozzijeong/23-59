/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { fetcher } from 'api';
import useSWR from 'swr';
import { DiaryStateProps, TodayDiaryProps } from 'types/interfaces';
import { DiaryMode } from 'types/enums';
import { INITIAL_DIARY_INFO } from 'utilities/initialValues';
import { converUserOptionToContent } from 'utilities/utils';
import { useRecoilState } from 'recoil';
import { accountTableAtom, emotionAtom, questionAtom, todayDiaryAtom, todayTodo } from 'recoil/diaryAtom';
import { useUserOptions } from './useUserOptions';

const END_POINT = '/api/contents/date';

const initialDiary = {
  diaryInfo: INITIAL_DIARY_INFO,
  diaryMode: DiaryMode.CREATE,
};
function useTodayDiary(date: string) {
  const { contentOptions, setContentOptions, initData } = useUserOptions();
  // 유저들 옵션 처리, 이게 CREATE일 때만 값을 불러오면 됨.
  const [todayDiary, setTodayDiary] = useState<TodayDiaryProps>(initialDiary);

  const { data, mutate } = useSWR<DiaryStateProps[]>(`${END_POINT}/${date}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 6000000000,
    suspense: true,
  });

  const [initTodo, setTodo] = useRecoilState(todayTodo);
  const [initQna, setQna] = useRecoilState(questionAtom);
  const [initEmotion, setEmotion] = useRecoilState(emotionAtom);
  const [initDiary, setDiary] = useRecoilState(todayDiaryAtom);
  const [initAccount, setAccount] = useRecoilState(accountTableAtom);

  useEffect(() => {
    if (!data) return;
    const info = data[0] ?? null;
    if (info === null) {
      setTodayDiary((prev) => ({ ...prev, diaryMode: DiaryMode.CREATE }));
    } else {
      const { todo, qna, emotion, diary, account } = info;
      setTodo(todo ?? initTodo);
      setQna(qna ?? initQna);
      setEmotion(emotion ?? initEmotion);
      setDiary(diary ?? initDiary);
      setAccount(account ?? initAccount);
      setTodayDiary({ diaryInfo: info, diaryMode: DiaryMode.READ });
    }
  }, [data]);

  useEffect(() => {
    if (todayDiary.diaryMode !== DiaryMode.CREATE) {
      setContentOptions(converUserOptionToContent(todayDiary.diaryInfo.checkOption));
    }
  }, [todayDiary.diaryMode]);

  return {
    todayDiary,
    setTodayDiary,
    contentOptions,
    setContentOptions,
    mutate,
    initOptions: initData,
  };
}

export { useTodayDiary };
