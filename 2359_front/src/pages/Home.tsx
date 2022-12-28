import React from 'react';
import Calendar from 'components/calendar/Calendar';
import Modal from 'components/Modal';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { useUserOptions } from 'hooks/useUserOptions';
import TutorialModal from 'components/tutorial/TutorialModal';
import { useSetRecoilState } from 'recoil';
import { showModalPage } from 'recoil/modalAtom';

function Home() {
  const { firstLogin, contentOptions, setContentOptions } = useUserOptions();
  // console.log(contentOptions, 'Home options');
  // console.log(firstLogin, contentOptions, 'firstLogin');
  const setShowModal = useSetRecoilState(showModalPage);
  if (firstLogin) {
    setShowModal(true);
  }
  return (
    <div>
      <Calendar />
      {firstLogin && (
        <Modal>
          <TutorialModal
            title="옵션 설정하기"
            btnclose="나중에 하기"
            btnsave="설정 저장하기"
            state={contentOptions}
            setState={setContentOptions}
          />
        </Modal>
      )}
    </div>
  );
}

export default Home;
