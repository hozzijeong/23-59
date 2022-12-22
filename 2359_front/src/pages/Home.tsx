<<<<<<< HEAD
import React from 'react';
import Calendar from 'components/calendar/Calendar';
import Modal from 'components/Modal';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { useUserOptions } from 'hooks/useUserOptions';
=======
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Calendar from 'components/calendar/Calendar';
import Modal from 'components/Modal';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { ContentOptionProps, OptionProps } from 'types/interfaces';
import { OptionEnums as OPTION } from 'types/enums';
import axios from 'axios';

// 서버에서 값을 받아 처리하는게 좋을듯. 그리고 서버에서 관리하는 값과 별개로 해당 state를 관리하는 useState가 필요
const TEMP_DATA: OptionProps[] = [
  { title: OPTION.TODO_LIST },
  { title: OPTION.TODAY_QUESTION },
  { title: OPTION.EMOTION },
  { title: OPTION.DIARY },
  { title: OPTION.ACCOUNT_BOOK },
];

const TEMP_OPTIONS = {
  [OPTION.TODO_LIST]: true,
  [OPTION.TODAY_QUESTION]: false,
  [OPTION.DIARY]: false,
  [OPTION.EMOTION]: false,
  [OPTION.ACCOUNT_BOOK]: false,
};
>>>>>>> 5d65a3eb422f876b94ae861bdd0dd4df13042037

const getUser = async () => {
  const usertoken = localStorage.getItem('token');
  const res = await axios.get(`/api/user/option/`, {
    headers: {
      authorization: `Bearer ${usertoken}`,
    },
  });
  return res.data;
};

function Home() {
<<<<<<< HEAD
  const { contentOptions, setContentOptions, firstLogin } = useUserOptions(); // 유저들 옵션 처리

  return (
    <div>
      <Calendar />
      {firstLogin === true && (
        <Modal title="옵션 설정하기" state={contentOptions}>
          <TutorialOption state={contentOptions} setState={setContentOptions} />
        </Modal>
      )}
=======
  const mixedData = useMemo(() => TEMP_DATA.map((data) => ({ ...data, isChecked: TEMP_OPTIONS[data.title] })), []); // 이렇게 따로 변수로 합쳐서 만들어도 되는지? 클라이언트에서만 사용되는 값들이고, 사용자가 화면에서 동적으로 변경했을 때 그 변경되는 값을 바로바로 적용해줘야 합니다.
  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>(mixedData);
  const [isFirst, setIsFirst] = useState(false);
  useEffect(() => {
    getUser().then((data) => setIsFirst(data.firstLogin));
  }, []);
  console.log(isFirst);
  return (
    <div>
      <Calendar />
      {isFirst ? (
        <Modal title="옵션 설정하기" state={contentOptions}>
          <TutorialOption state={contentOptions} setState={setContentOptions} />
        </Modal>
      ) : null}
>>>>>>> 5d65a3eb422f876b94ae861bdd0dd4df13042037
    </div>
  );
}

export default Home;
