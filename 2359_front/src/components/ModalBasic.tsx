import React from 'react';
import { useSetRecoilState } from 'recoil';
import { showModalPage } from 'recoil/modalAtom';
import tw from 'tailwind-styled-components';
import Button from './Button';
import Modal from './Modal';

interface ModalBasicProps {
  title: string;
  children?: React.ReactNode;
  headerclose?: boolean;
  btnclose?: string;
  btnsave?: string;
  saveHandler?: () => void;
}
// 사용법 : title은 필수, 나머지는 선택
// <ModalBasic title='제목 입력' headerclose='닫기 버튼(위)' btnclose='닫기 버튼(아래)' btnsave='저장 혹은 확인 버튼' saveHandler='저장 혹은 확인 시 함수'>
//  <div></div>
// </ModalBasic>
function ModalBasic({ title, children, headerclose, btnclose, btnsave, saveHandler }: ModalBasicProps) {
  const setShowModal = useSetRecoilState(showModalPage);
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        {headerclose && (
          <Button btntype="basic" onClick={() => setShowModal(false)}>
            X
          </Button>
        )}
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
      <ModalFooter>
        {btnclose && (
          <Button btntype="cancel" onClick={() => setShowModal(false)}>
            {btnclose}
          </Button>
        )}
        {btnsave && (
          <Button btntype="save" onClick={saveHandler}>
            {btnsave}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default ModalBasic;

ModalBasic.defaultProps = {
  children: '내용을 넣어주세요',
  headerclose: false,
  btnclose: null,
  btnsave: null,
  saveHandler: null,
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
