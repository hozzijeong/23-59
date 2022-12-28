/* eslint-disable no-underscore-dangle */
import { getRandomQuestion } from 'api';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { questionAtom } from 'recoil/diaryAtom';
import useSWR from 'swr';
import { RandomQuestionProps } from 'types/interfaces';

function useRandomQuestion() {
  const { id } = useParams();
  const setQna = useSetRecoilState(questionAtom);

  const { data } = useSWR<RandomQuestionProps>(`/api/questions/random/${id}`, getRandomQuestion, {
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    suspense: true,
    onSuccess: (data) => {
      setQna((prev) => ({ ...prev, questionId: data._id, question: data.item }));
    },
  });

  useEffect(() => {
    if (!data) return;
    setQna((prev) => ({ ...prev, questionId: data._id, question: data.item }));
  }, [data]);

  return { data };
}

export { useRandomQuestion };
