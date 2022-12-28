/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { fetcher } from 'api';
import useSWR from 'swr';
import { DiaryStateProps, TodayDiaryProps } from 'types/interfaces';
import { diaryMode as DiaryMode } from 'types/enums';
import { INITIAL_DIARY_INFO } from 'utilities/initialValues';
import { converUserOptionToContent } from 'utilities/utils';
import { useRecoilState } from 'recoil';
import { accountTableAtom, emotionAtom, questionAtom, todayDiaryAtom, todayTodo } from 'recoil/diaryAtom';
import { useUserOptions } from './useUserOptions';
import { useRandomQuestion } from './useRandomQuestion';

const END_POINT = '/api/contents/date';

function useTodayDiary(date: string) {
  const { contentOptions, setContentOptions, initData } = useUserOptions();
  const { data: question } = useRandomQuestion();
  const [todayDiary, setTodayDiary] = useState<TodayDiaryProps>({
    diaryInfo: {
      ...INITIAL_DIARY_INFO,
      qna: { questionId: question?._id ?? '', question: question?.item ?? '', answer: '' },
    },
    diaryMode: DiaryMode.CREATE,
  });

  const [initTodo, setTodo] = useRecoilState(todayTodo);
  const [initQna, setQna] = useRecoilState(questionAtom);
  const [initEmotion, setEmotion] = useRecoilState(emotionAtom);
  const [initDiary, setDiary] = useRecoilState(todayDiaryAtom);
  const [initAccount, setAccount] = useRecoilState(accountTableAtom);
  const tempId = localStorage.getItem('tempId') ?? null;

  const { data, mutate, isValidating } = useSWR<DiaryStateProps[]>(
    `${END_POINT}/${date}/${tempId}`,
    () => fetcher(`${END_POINT}/${date}`),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000000000000,
      suspense: true,
      onSuccess: (data) => {
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
      },
    }
  );

  useEffect(() => {
    if (data === undefined) return;
    const info = data[0] ?? null;
    if (!info) return;

    const { todo, qna, emotion, diary, account } = info;
    setTodo(todo ?? initTodo);
    setQna(qna ?? initQna);
    setEmotion(emotion ?? initEmotion);
    setDiary(diary ?? initDiary);
    setAccount(account ?? initAccount);
    setTodayDiary({ diaryInfo: info, diaryMode: DiaryMode.READ });
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
    isValidating,
  };
}

export { useTodayDiary };
