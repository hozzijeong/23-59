import React, { useState } from 'react';
import Calendar from 'components/calendar/Calendar';
import ModalBasic from 'components/ModalBasic';
import { ContentOptions } from 'components/diary/ContentOptions';
import { useUserOptions } from 'hooks/useUserOptions';
import { TutorialOption } from 'components/tutorial/TutorialOption';

function Home() {
  // const { firstLogin, contentOptions, setContentOptions } = useUserOptions();
  // console.log(firstLogin, contentOptions, 'firstLogin');
  const [showModal, setShowModal] = useState(false);
  // if (firstLogin) {
  //   setShowModal(true);
  // }
  const optionSaveHandler = () => {
    setShowModal(false);
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
          체크 옵션..ㅎ
        </ModalBasic>
      )}
    </div>
  );
}

export default Home;
