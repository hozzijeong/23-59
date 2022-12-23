import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Button from '../Button';
import useUserDelete from '../../hooks/useUserDelete';

interface ModalProps<T> {
  title?: string;
  children?: React.ReactNode;
  btnclose?: string;
  btnsave?: string;
  state?: T;
}

function FormModal<T>({ title, children, btnclose, btnsave, state }: ModalProps<T>) {
  const [showModal, setShowModal] = useState(true);
  const { userDelete } = useUserDelete();

  const saveHandler = () => {
    setShowModal(false);
    console.log(state);
  };

  return (
    <div>
      {showModal ? (
        <>
          <ModalScreen>
            <ModalContainer>
              <ModalBox>
                <ModalHeader>
                  <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <ModalContent>{children}</ModalContent>
                <ModalFooter>
                  <Button btntype="cancel" onClick={() => setShowModal(false)}>
                    {btnclose}
                  </Button>
                  <Button btntype="save" onClick={() => userDelete()}>
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

export default FormModal;

FormModal.defaultProps = {
  title: '회원 탈퇴',
  children: null,
  btnclose: '닫기',
  btnsave: '탈퇴',
  state: null,
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
