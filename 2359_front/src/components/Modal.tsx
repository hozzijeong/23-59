import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showModalPage } from 'recoil/modalAtom';
import tw from 'tailwind-styled-components';

interface ModalProps {
  children?: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const showModal = useRecoilValue(showModalPage);

  return (
    <div>
      {showModal && (
        <>
          <ModalScreen>
            <ModalContainer>
              <ModalBox>{children}</ModalBox>
            </ModalContainer>
          </ModalScreen>
          <ModalBackScreen />
        </>
      )}
    </div>
  );
}

export default Modal;

Modal.defaultProps = {
  children: null,
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
w-full
my-6
mx-auto 
max-w-sm
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
