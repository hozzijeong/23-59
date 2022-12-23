import React from 'react';
import Calendar from 'components/calendar/Calendar';
import Modal from 'components/Modal';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { useUserOptions } from 'hooks/useUserOptions';

function Home() {
  const { contentOptions, setContentOptions, firstLogin } = useUserOptions(); // 유저들 옵션 처리
  console.log(contentOptions, 'HOme options');

  return (
    <div>
      <Calendar />
      {firstLogin === true && (
        <Modal title="옵션 설정하기" state={contentOptions}>
          <TutorialOption state={contentOptions} setState={setContentOptions} />
        </Modal>
      )}
    </div>
  );
}

export default Home;
