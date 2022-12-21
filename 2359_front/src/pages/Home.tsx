import React, { useMemo, useState, useCallback } from 'react';
import Calendar from 'components/calendar/Calendar';
import Modal from 'components/Modal';
import { TutorialOption } from 'components/tutorial/TutorialOption';
import { ContentOptionProps, OptionProps } from 'types/interfaces';
import { OptionEnums as OPTION } from 'types/enums';

// 서버에서 값을 받아 처리하는게 좋을듯. 그리고 서버에서 관리하는 값과 별개로 해당 state를 관리하는 useState가 필요
const TEMP_DATA: OptionProps[] = [
  { id: '1', title: OPTION.TODO_LIST },
  { id: '2', title: OPTION.TODAY_QUESTION },
  { id: '3', title: OPTION.EMOTION },
  { id: '4', title: OPTION.DIARY },
  { id: '5', title: OPTION.ACCOUNT_BOOK },
];

const TEMP_OPTIONS = {
  [OPTION.TODO_LIST]: true,
  [OPTION.TODAY_QUESTION]: false,
  [OPTION.DIARY]: false,
  [OPTION.EMOTION]: false,
  [OPTION.ACCOUNT_BOOK]: false,
};

function Home() {
  const mixedData = useMemo(() => TEMP_DATA.map((data) => ({ ...data, isChecked: TEMP_OPTIONS[data.title] })), []); // 이렇게 따로 변수로 합쳐서 만들어도 되는지? 클라이언트에서만 사용되는 값들이고, 사용자가 화면에서 동적으로 변경했을 때 그 변경되는 값을 바로바로 적용해줘야 합니다.
  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>(mixedData);

  return (
    <div>
      <Calendar />
      <Modal title="옵션 설정하기" state={contentOptions}>
        <TutorialOption state={contentOptions} setState={setContentOptions} />
      </Modal>
    </div>
  );
}

export default Home;
