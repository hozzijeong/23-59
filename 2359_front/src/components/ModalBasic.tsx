import React from 'react';
import tw from 'tailwind-styled-components';
import Button from './Button';
import Tooltip from './Tooltip';

interface ModalBasicProps {
  title: string;
  children?: React.ReactNode;
  tooltip?: boolean;
  tooltipText?: string;
  headerClose?: boolean;
  closeText?: string;
  submitText?: string;
  cancelHandler?: () => void;
  submitHandler?: () => void;
}
// 사용법 : title은 필수, 나머지는 선택
// <ModalBasic title='제목 입력' tooltip='툴팁' tooltipText='툴팁 텍스트' headerClose='닫기 버튼(위)' closeText='닫기 버튼(아래)' submitText='제출 버튼' cancelHandler='닫기 함수' submitHandler='제출 시 함수'>
//  <div>{children}</div>
// </ModalBasic>
function ModalBasic({
  title,
  children,
  tooltip,
  tooltipText,
  headerClose,
  closeText,
  submitText,
  cancelHandler,
  submitHandler,
}: ModalBasicProps) {
  return (
    <>
      <ModalScreen>
        <ModalContainer>
          <ModalBox>
            {' '}
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              {tooltip && <Tooltip title="?" content={tooltipText} />}
              {headerClose && (
                <Button btntype="basic" onClick={cancelHandler}>
                  X
                </Button>
              )}
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
            <ModalFooter>
              {closeText && (
                <Button btntype="cancel" onClick={cancelHandler}>
                  {closeText}
                </Button>
              )}
              {submitText && (
                <Button btntype="save" onClick={submitHandler}>
                  {submitText}
                </Button>
              )}
            </ModalFooter>
          </ModalBox>
        </ModalContainer>
      </ModalScreen>
      <ModalBackScreen />
    </>
  );
}

export default ModalBasic;

ModalBasic.defaultProps = {
  children: '내용을 넣어주세요',
  tooltip: false,
  tooltipText: '',
  headerClose: false,
  closeText: null,
  submitText: null,
  cancelHandler: null,
  submitHandler: null,
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
