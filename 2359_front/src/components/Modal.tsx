import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Button from './Button';

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  btnclose?: string;
  btnsave?: string;
}

function Modal({ title, children, btnclose, btnsave }: ModalProps) {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {showModal ? (
        <>
          <ModalScreen>
            <ModalContainer>
              <ModalBox>
                <ModalHeader>
                  <ModalTitle>{title}</ModalTitle>
                  <Tooltip type="button">
                    <span className="text-lg flex justify-center leading-none">?</span>
                  </Tooltip>
                </ModalHeader>
                <ModalContent>{children}</ModalContent>
                <ModalFooter>
                  <Button btntype="cancel" onClick={() => setShowModal(false)}>
                    {btnclose}
                  </Button>
                  <Button btntype="save" onClick={() => setShowModal(false)}>
                    {btnsave}
                  </Button>
                </ModalFooter>
              </ModalBox>
            </ModalContainer>
          </ModalScreen>
          <ModalBackScreen />
        </>
      ) : null}
    </div>
  );
}

export default Modal;

Modal.defaultProps = {
  title: '제목',
  children: null,
  btnclose: '닫기',
  btnsave: '저장',
};

const ModalScreen = tw.div`
justify-center 
items-center 
flex 
overflow-x-hidden 
overflow-y-auto 
fixed 
inset-0 
z-50 
outline-none focus:outline-none
`;
const ModalBackScreen = tw.div`
opacity-25 
fixed 
inset-0 
z-40 
bg-black
`;
const ModalContainer = tw.div`
relative 
w-1/5
my-6
mx-auto 
max-w-lg
`;
const ModalBox = tw.div`
border-0
rounded-lg 
shadow-lg 
relative 
flex 
flex-col 
w-full 
bg-white 
outline-none 
focus:outline-none
`;

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

const Tooltip = tw.button`
h-6
w-6
bg-primaryDark 
rounded-xl 
text-white 
shadow 
hover:bg-primary 
ease-linear 
transition-all 
duration-150
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
