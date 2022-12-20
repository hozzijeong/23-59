import React from 'react';
import Calendar from 'components/calendar/Calendar';
import Modal from 'components/Modal';
import TutorialOption from 'components/tutorial/TutorialOption';

function Home() {
  return (
    <div>
      <Calendar />
      <Modal title="옵션 설정하기">
        <TutorialOption />
      </Modal>
    </div>
  );
}

export default Home;
