/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
import Button from 'components/Button';
import { ContentOptions } from 'components/diary/ContentOptions';
import Tooltip from 'components/Tooltip';
import { useUserOptions } from 'hooks/useUserOptions';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { showModalPage } from 'recoil/modalAtom';
import tw from 'tailwind-styled-components';
import { ContentOptionProps } from 'types/interfaces';
import { TutorialOption } from './TutorialOption';

interface TutorialModalProps {
  title?: string;
  btnclose?: string;
  btnsave?: string;
  state: ContentOptionProps[];
  setState: React.Dispatch<React.SetStateAction<ContentOptionProps[]>>;
}

function TutorialModal({ title, btnclose, btnsave, state, setState }: TutorialModalProps) {
  const setShowModal = useSetRecoilState(showModalPage);
  // const { contentOptions, setContentOptions, data } = useUserOptions();
  // console.log(contentOptions, data, 'tutorial modal');
  const saveHandler = () => {
    setShowModal(false);
    // console.log(contentOptions, 'state');
  };

  return (
    <div>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <Tooltip text="매일 작성하는 옵션을 설정하고,   마이페이지에서 수정할 수 있어요" />
      </ModalHeader>
      <ModalContent>
        <TutorialOption state={state} setState={setState} />
      </ModalContent>
      <ModalFooter>
        <Button btntype="cancel" onClick={() => setShowModal(false)}>
          {btnclose}
        </Button>
        <Button btntype="save" onClick={saveHandler}>
          {btnsave}
        </Button>
      </ModalFooter>
    </div>
  );
}

export default TutorialModal;

TutorialModal.defaultProps = {
  title: '제목',
  btnclose: '닫기',
  btnsave: '저장',
  state: [],
};

const ModalHeader = tw.div`
flex 
items-start 
justify-between 
p-5 
border-b 
border-solid 
border-gray-200 
rounded-t
`;

const ModalTitle = tw.h3`
text-xl 
font-semibold
`;

const ModalContent = tw.div`
relative
p-6 
flex-auto
`;

const ModalFooter = tw.div`
flex
items-center 
justify-end
p-5 
border-t 
border-solid 
border-slate-200 
rounded-b
`;
