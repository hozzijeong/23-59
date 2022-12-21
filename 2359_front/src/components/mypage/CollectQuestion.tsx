import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

const tagData: string[] = [
  '#슬픔',
  '#기쁨',
  '#행복',
  '#죽음',
  '#공부',
  '#연애',
  '#사랑',
  '#고민',
  '#걱정',
  '#배고파',
  '#음식',
  '#취업',
  '#워라벨',
];

interface IData {
  [key: string]: boolean;
}

const newData: IData = {};
const setData = (): void => {
  tagData.forEach((item) => {
    newData[item] = true;
  });
};
setData();
// console.log('newData', newData);

function CollectQuestion() {
  const [isSelect, setIsSelect] = useState(newData);
  const [showModal, setShowModal] = React.useState(false);

  const selectedTag = () => {
    return Object.keys(isSelect).filter((key) => isSelect[key] === true);
  };

  const handleTagName = (item: string): void => {
    const newSelect = { ...isSelect };
    newSelect[item] = !newSelect[item];
    setIsSelect(newSelect);
    selectedTag();
  };

  const tagBtnClassName = (ele: string): string => {
    if (isSelect[ele]) {
      return selectBtnClass;
    }
    return nonSelectBtnClass;
  };

  return (
    <Container>
      <div>오늘의 질문 모아보기</div>
      <ButtonContainer>
        {tagData.map((tagItem) => {
          return (
            <TagButtons
              className={tagBtnClassName(tagItem)}
              key={tagItem}
              type="button"
              onClick={() => handleTagName(tagItem)}
            >
              {tagItem}
            </TagButtons>
          );
        })}
      </ButtonContainer>
      <div>
        <AnswerUl>
          <AnswerList onClick={() => setShowModal(true)}>
            태그를 선택하면 해당하는 질문에 대한 질문 1이 보여질거에여
          </AnswerList>
          <AnswerList onClick={() => setShowModal(true)}>이건 질문 2임</AnswerList>
          <AnswerList onClick={() => setShowModal(true)}>요거슨 3번째 알맞는 질문임</AnswerList>
        </AnswerUl>
      </div>
      {showModal ? (
        <>
          <ModalLayout>
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <ModalContainer>
                <ModalHeader>
                  <ModalTitleH3>Modal Title</ModalTitleH3>
                  <ModalCloseBtn type="button" onClick={() => setShowModal(false)}>
                    <Close>×</Close>
                  </ModalCloseBtn>
                </ModalHeader>

                <ModalMain>
                  <ModalScript>여기에 이제 질문 답변이 들어갈거임</ModalScript>
                </ModalMain>

                <ModalFooter>
                  <ModalCancleBtn type="button" onClick={() => setShowModal(false)}>
                    Close
                  </ModalCancleBtn>
                  <ModalConfirmBtn type="button" onClick={() => setShowModal(false)}>
                    Save Changes
                  </ModalConfirmBtn>
                </ModalFooter>
              </ModalContainer>
            </div>
          </ModalLayout>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">{null}</div>
        </>
      ) : null}
    </Container>
  );
}

export default CollectQuestion;

const Container = tw.div`
  w-full  
  flex
  align-center
  flex-col
  space-y-4
`;

// 태그영역
const ButtonContainer = tw.div`
  w-[94%]
  mx-auto
  min-h-[60px]
`;

const TagButtons = tw.button`
  mr-3
  w-16
  h-7  
`;

const selectBtnClass = `
  inline-block px-2.5 py-1 bg-blue-600 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg 
  mr-3
  mb-3
  text-xs
  
`;

const nonSelectBtnClass = `
  inline-block px-2.5 py-1 text-blue font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg hover:bg-neutral-300
  mr-3
  mb-3
  text-xs
`;

// 질문 리스트 영역
const AnswerUl = tw.ul`
  w-full
  p-4
`;

const AnswerList = tw.li`
  rounded-md
  w-full
  shadow-md
  p-3
  m-3
  hover:bg-gray-200
  active:bg-stone-300
  cursor-pointer
`;

// 모달 영역
const ModalLayout = tw.div`
  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
`;

// 모달 내 영역
const ModalContainer = tw.div`
  border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none
`;
// 모달 헤더
const ModalHeader = tw.div`
  flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t
`;

const ModalTitleH3 = tw.h3`
  text-3xl font-semibold
`;

const ModalCloseBtn = tw.button`
  p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none
`;

const Close = tw.span`
  bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none
`;
// 모달 메인
const ModalMain = tw.div`
  relative p-6 flex-auto
`;

const ModalScript = tw.p`
  my-4 text-slate-500 text-lg leading-relaxed
`;
// 모달 푸터
const ModalFooter = tw.div`
  flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b
`;

const ModalConfirmBtn = tw.button`
  bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
`;

const ModalCancleBtn = tw.button`
  text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
`;

// BtnClass 참고 사항
// focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
// active:bg-blue-800 active:shadow-lg
