import React, { useState, useEffect } from 'react';
import './Paging.css';
import axios from 'axios';
import tw from 'tailwind-styled-components';
import ModalBasic from 'components/ModalBasic';
import Pagination from 'react-js-pagination';

interface IQnaProps {
  question: string | undefined;
  answer: string | undefined;
  tag: string | undefined;
  _id: string;
}

interface IData {
  selectedDate: string;
  qna: IQnaProps;
}

function Questions() {
  // 배열 > 객체 > 객체 ?  Record<string, string | IQna> ?  Record<IData, string | undefined> ?
  const initialData: any = [];
  const newData: any = [];
  const tagData: string[] = [];
  const tagSelectedAnswer: object[] = [];

  const [qnaList, setQnaList] = useState(initialData);
  const [isSelect, setIsSelect] = useState(newData);
  const [tagList, setTagList] = useState(tagData);
  const [resultAnswer, setResultAnswer] = useState(tagSelectedAnswer);
  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState(tagSelectedAnswer);
  const [showModal, setShowModal] = useState(false);
  const [currentList, setCurrentList] = useState({
    selectedDate: '',
    qna: {
      question: '',
      answer: '',
      tag: '',
    },
  });

  async function getAllQuestionList() {
    const res = await axios.get('/api/contents/filter/qna', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.data;

    // TODO: 오브젝트 타입 설정 필수
    const tmp = data.map((item: any) => item.qna.tag);
    const tmpTagList = tmp
      .filter((value: string, idx: number) => tmp.indexOf(value) === idx)
      .filter((item: string) => item !== undefined);

    tmpTagList.forEach((item: string) => {
      newData[item] = true;
    });
    setQnaList(data);
    setTagList(tmpTagList);
  }

  function showSelectedAnswers() {
    if (qnaList.length !== 0) {
      const trueKey = Object.keys(isSelect).filter((key) => isSelect[key] === true);

      const tmpArr: any = [];
      for (let i = 0; i < trueKey.length; i += 1) {
        // TODO: qna 가 객체안의 객체 형태라서 type지정 필수!
        tmpArr.push(qnaList.filter((ele: any) => trueKey[i] === ele.qna.tag));
      }
      const reducedArr = tmpArr.reduce((acc: any, cur: any) => {
        return [...acc, ...cur];
      });

      setResultAnswer(reducedArr);
    }
  }

  const handleTag = (item: string): void => {
    const newSelect = { ...isSelect };
    newSelect[item] = !newSelect[item];
    setIsSelect(newSelect);
  };

  const tagBtnClassName = (ele: string): string => {
    if (isSelect[ele]) {
      return selectBtnClass;
    }
    return nonSelectBtnClass;
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const showAnswer = () => {
    setPageList(resultAnswer.slice(8 * (page - 1), 8 * page));
  };

  useEffect(() => {
    showAnswer();
  }, [page, resultAnswer]);

  useEffect(() => {
    getAllQuestionList();
  }, []);

  useEffect(() => {
    showSelectedAnswers();
    showAnswer();
  }, [qnaList]);

  useEffect(() => {
    showSelectedAnswers();
  }, [isSelect]);

  return (
    <Container>
      <div>오늘의 질문 모아보기</div>
      <ButtonContainer>
        {tagList
          ? tagList.map((tagItem) => {
              return (
                <TagButtons
                  className={tagBtnClassName(tagItem)}
                  key={tagItem}
                  type="button"
                  onClick={() => {
                    handleTag(tagItem);
                    setPage(1);
                  }}
                >
                  {tagItem}
                </TagButtons>
              );
            })
          : null}
      </ButtonContainer>
      <AnswerContainer>
        <AnswerUl>
          {pageList
            ? pageList.map((ele: any) => (
                // TODO: 배열안에 객체 interface 설정
                <AnswerList
                  key={ele.selectedDate}
                  onClick={() => {
                    setCurrentList(ele);
                    setShowModal(true);
                  }}
                >
                  {ele.qna.question}
                </AnswerList>
              ))
            : null}
        </AnswerUl>
      </AnswerContainer>
      <Pagination
        activePage={page}
        itemsCountPerPage={8} // 9
        totalItemsCount={resultAnswer.length} // all.length
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
      {showModal ? (
        <ModalBasic title={currentList.qna.question} closeText="닫기" cancelHandler={() => setShowModal(false)}>
          <div>작성날짜: {currentList.selectedDate}</div>
          <div>답변: {currentList.qna.answer}</div>
        </ModalBasic>
      ) : null}
    </Container>
  );
}

export default Questions;

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
const AnswerContainer = tw.div`
  w-full
  min-h-[525px]
`;

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
  bg-gray-100
  hover:bg-gray-200
  active:bg-stone-300
  cursor-pointer
`;

// // 모달 영역
// const ModalLayout = tw.div`
//   justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
// `;

// // 모달 내 영역
// const ModalContainer = tw.div`
//   border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none
// `;
// // 모달 헤더
// const ModalHeader = tw.div`
//   flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t
// `;

// const ModalTitleH3 = tw.h3`
//   text-3xl font-semibold
// `;

// const ModalCloseBtn = tw.button`
//   p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none
// `;

// const Close = tw.span`
//   bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none
// `;
// // 모달 메인
// const ModalMain = tw.div`
//   relative p-6 flex-auto
// `;

// const ModalScript = tw.div`
//   my-4 text-slate-500 text-lg leading-relaxed
// `;
// // 모달 푸터
// const ModalFooter = tw.div`
//   flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b
// `;

// const ModalConfirmBtn = tw.button`
//   bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
// `;

// const ModalCancleBtn = tw.button`
//   text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
// `;
