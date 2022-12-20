import React, { useState } from 'react';

function TutorialModal() {
  const [showModal, setShowModal] = useState(false);
  const [diaryoption, setDiaryOption] = useState([]);
  return (
    <div>
      <button type="button" className="bg-stone-300 px-4 py-2 rounded" onClick={() => setShowModal(true)}>
        옵션 설정하기
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-xl font-semibold">하루 정리 옵션 설정하기</h3>
                  <button
                    type="button"
                    className="h-6 w-6 bg-primaryDark rounded-xl text-white shadow hover:bg-primary ease-linear transition-all duration-150"
                  >
                    <span className="text-lg flex justify-center leading-none">?</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <label htmlFor="todolist" className="my-4 text-gray-500 text-lg leading-relaxed">
                    <input type="checkbox" id="todolist" onChange={(e) => console.log(e.target.id)} />
                    <span className="ml-2">todolist</span>
                  </label>
                  <br />
                  <label htmlFor="todayquestion" className="my-4 text-gray-500 text-lg leading-relaxed">
                    <input type="checkbox" id="todayquestion" />
                    <span className="ml-2">오늘의 질문</span>
                  </label>
                  <br />
                  <label htmlFor="emotiondiary" className="my-4 text-gray-500 text-lg leading-relaxed">
                    <input type="checkbox" id="emotiondiary" />
                    <span className="ml-2">감정 일기</span>
                  </label>
                  <br />
                  <label htmlFor="accountbook" className="my-4 text-gray-500 text-lg leading-relaxed">
                    <input type="checkbox" id="accountbook" />
                    <span className="ml-2">가계부</span>
                  </label>
                </div>
                <div className="flex items-center justify-end p-5 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-transparent font-bold active:text-primary px-5 py-2 text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    나중에 설정하기
                  </button>
                  <button
                    className="bg-primaryDark text-white active:bg-primary font-bold text-sm px-5 py-3 rounded-lg shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    설정 저장하기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </div>
  );
}

export default TutorialModal;
