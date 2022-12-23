import React from 'react';
import Calendar from 'components/calendar/Calendar';
import Modal from 'components/Modal';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { useUserOptions } from 'hooks/useUserOptions';
import TutorialModal from 'components/tutorial/TutorialModal';

function Home() {
  const { contentOptions, firstLogin } = useUserOptions();
  console.log(contentOptions, 'Home options');
  console.log(firstLogin, 'firstLogin');

  return (
    <div>
      <Calendar />
      {firstLogin === true && (
        <Modal>
          <TutorialModal title="옵션 설정하기" btnclose="나중에 하기" btnsave="설정 저장하기" state={contentOptions} />
        </Modal>
      )}
    </div>
  );
}

export default Home;
