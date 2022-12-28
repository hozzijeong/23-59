import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { accountTableAtom, emotionAtom, questionAtom, todayDiaryAtom, todayTodo } from 'recoil/diaryAtom';
import { INITIAL_TODAY_DIARY, QNA_INNITIAL } from 'constant/initialValues';

function useInitializeDiaryRecoil() {
  const setTodo = useSetRecoilState(todayTodo);
  const setQna = useSetRecoilState(questionAtom);
  const setEmotion = useSetRecoilState(emotionAtom);
  const setDiary = useSetRecoilState(todayDiaryAtom);
  const setAccount = useSetRecoilState(accountTableAtom);

  const initilizeSetRecoilState = useCallback(() => {
    setTodo([]);
    setQna(QNA_INNITIAL);
    setEmotion(null);
    setDiary(INITIAL_TODAY_DIARY);
    setAccount([]);
  }, [setAccount, setDiary, setEmotion, setQna, setTodo]);

  return { initilizeSetRecoilState };
}

export { useInitializeDiaryRecoil };
