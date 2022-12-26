import React, { useEffect, useState } from 'react';
import Calendar from 'components/calendar/Calendar';
import ModalBasic from 'components/ModalBasic';
import { useUserOptions } from 'hooks/useUserOptions';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { baseAxios } from 'api';

function Home() {
  const { firstLogin, contentOptions, setContentOptions, mutate } = useUserOptions();
  // console.log(firstLogin, contentOptions, '수정 전');
  const [showModal, setShowModal] = useState(firstLogin);

  useEffect(() => {
    if (firstLogin === true) {
      setShowModal(true);
    } else if (firstLogin === false) {
      setShowModal(false);
    }
  }, [firstLogin]);

  // option 설정
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
    // console.log(firstLogin, contentOptions, '수정 후');
  };

  /**
   * API 캐싱 이슈..
   * 일단, 같은 url을 사용하기 때문에 SWR에서 사용되는 key 값이 같음
   * 이로 인해 서로 다른 계정으로 로그인해도, 이전에 isFirstLogin 되어 있는 값을 받아올 때 캐싱된 데이터를 사용하게 됨.
   *
   */

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
