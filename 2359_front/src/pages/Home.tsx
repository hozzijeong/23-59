import React, { useEffect, useState } from 'react';
import Calendar from 'components/calendar/Calendar';
import ModalBasic from 'components/ModalBasic';
import { useUserOptions } from 'hooks/useUserOptions';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { baseAxios } from 'api';
import { useInitializeDiaryRecoil } from 'hooks/useInitiallizeDiaryRecoil';

function Home() {
  const { firstLogin, contentOptions, setContentOptions, mutate } = useUserOptions();
  const [showModal, setShowModal] = useState(firstLogin);
  const { initilizeSetRecoilState } = useInitializeDiaryRecoil();

  useEffect(() => {
    if (firstLogin === true) {
      setShowModal(true);
    } else if (firstLogin === false) {
      setShowModal(false);
    }
    initilizeSetRecoilState();
  }, [firstLogin]);

  const title = contentOptions.map((option) => {
    return option.title;
  });
  const isChecked = contentOptions.map((option) => {
    return option.isChecked;
  });
  const newObj = title.reduce((acc, cur, idx) => {
    return { ...acc, [cur]: isChecked[idx] };
  }, {});
  const data = {
    firstLogin: false,
    createOption: newObj,
  };
  const userToken = localStorage.getItem('token');

  async function updateUser() {
    try {
      await baseAxios.patch('/api/user/option', data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    } catch (err) {
      alert('정보를 저장할 수 없습니다');
    }
  }

  const optionSaveHandler = () => {
    setContentOptions(contentOptions);
    updateUser().then(() => setShowModal(false));
    mutate();
  };
  return (
    <div>
      <Calendar />
      {showModal && (
        <ModalBasic
          title="옵션 설정하기"
          tooltip
          tooltipText="매일 쓰는 일기의 옵션을 설정할 수 있어요. 설정한 옵션은 마이페이지에서 수정할 수 있어요."
          closeText="나중에 설정하기"
          submitText="설정 저장하기"
          cancelHandler={() => setShowModal(false)}
          submitHandler={optionSaveHandler}
        >
          <TutorialOption state={contentOptions} setState={setContentOptions} />
        </ModalBasic>
      )}
    </div>
  );
}

export default Home;
