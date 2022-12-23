import axios from 'axios';
import e from 'express';
import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

import data from './mock/questionData.json';

interface IData {
  [key: string]: boolean;
}

// tagData에 태그만 넣어주는 함수
let tagData: string[] = [];
function pushTagData() {
  const tmp = data.map((item) => item.question.tag);
  tagData = tmp.filter((value, idx) => tmp.indexOf(value) === idx);
}

// 질문만 걸러내는 함수
let result: string[] = [];
function filterQuestionList() {
  result = [];
  for (let i = 0; i < data.length; i += 1) {
    if (tagData.includes(data[i].question.tag)) {
      result.push(data[i].question.item);
    }
  }
}

// 태그를 선택했을때 질문을 해당 태그만 보여주는 함수

// 질문을 클릭했을 때 모달창으로 보여줄 answer item 필터링 함수
// TODO: 배열안에 객체 interface 설정
let filterdAnswerItem: any[] = [];
function filterAnswerList(str: string) {
  filterdAnswerItem = data.filter((ele) => ele.question.item === str);
}

// tagData를 Key: boolean 값으로 만들어주는 함수
const newData: IData = {};
const setData = (): void => {
  tagData.forEach((item) => {
    newData[item] = true;
  });
};

pushTagData();
setData();
filterQuestionList();

// 컴포넌트
function CollectQuestion() {
  const [isSelect, setIsSelect] = useState(newData);
  const [showModal, setShowModal] = React.useState(false);
  const [currentList, setCurrentList] = useState({
    selectedDate: '',
    question: {
      item: '',
      tag: '',
    },
    answer: '',
  });

  useEffect(() => {
    filterQuestionList();
  }, [isSelect]);

  // 해당 태그가 참 or 거짓에 따라 클래스이름 부여 하는 함수
  const tagBtnClassName = (ele: string): string => {
    if (isSelect[ele]) {
      return selectBtnClass;
    }
    return nonSelectBtnClass;
  };

  let tagSelectedAnswer: object[] = [];
  const selectedTag = () => {
    const trueKey = Object.keys(isSelect).filter((key) => isSelect[key] === true);

    // TODO: 배열안에 배열안에 객체안에 객체... interface 설정 하...
    /*
    [
      {
        answer: "마라탕^^"
        question: {item: '오늘 먹은 최고의 음식은?', tag: '#음식'}
        selectedDate : "20221201"
      }
    ],
    */
    const tmpArr: any = [];
    for (let i = 0; i < trueKey.length; i += 1) {
      tmpArr.push(data.filter((ele) => trueKey[i] === ele.question.tag));
    }
    tagSelectedAnswer = tmpArr.reduce((acc: any, cur: any) => {
      return [...acc, ...cur];
    });
  };
  selectedTag();

  const handleTag = (item: string): void => {
    const newSelect = { ...isSelect };
    newSelect[item] = !newSelect[item];
    setIsSelect(newSelect);
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
              onClick={() => handleTag(tagItem)}
            >
              {tagItem}
            </TagButtons>
          );
        })}
      </ButtonContainer>
      <div>
        <AnswerUl>
          {tagSelectedAnswer.map((ele: any) => (
            // TODO: 배열안에 객체 interface 설정
            <AnswerList
              key={ele.selectedDate}
              onClick={() => {
                filterAnswerList(ele);
                setCurrentList(ele);
                setShowModal(true);
              }}
            >
              {ele.question.item}
            </AnswerList>
          ))}
        </AnswerUl>
      </div>
      {showModal ? (
        <>
          <ModalLayout>
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              <ModalContainer>
                <ModalHeader>
                  <ModalTitleH3>{currentList.question.item}</ModalTitleH3>
                </ModalHeader>

                <ModalMain>
                  <ModalScript>
                    <div>답변: {currentList.answer}</div>
                    <div>날짜: {currentList.selectedDate}</div>
                  </ModalScript>
                </ModalMain>

                <ModalFooter>
                  <ModalConfirmBtn type="button" onClick={() => setShowModal(false)}>
                    닫기
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

const ModalScript = tw.div`
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

// const getQuestion = async () => {
//   const data = await fetch('./questionData.json', {
//     headers: {
//       // Accept: 'application / json',
//     },
//     method: 'GET',
//   });
//   const res = data.json();
//   console.log(res);
// };

// const getQuestion = async () => {
//   // const data = await axios.get('./questionData.json');
//   console.log({ data });
// };
// useEffect(() => {
//   getQuestion();
// }, []);
