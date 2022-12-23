import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import axios from 'axios';
// import { baseAxios } from 'api';
import { OptionEnums } from 'types/enums';
import { baseAxios } from 'api';

// {
//   ACCOUNT_BOOK: false,
//   DIARY: false,
//   EMOTION: false,
//   TODAY_QUESTION: false,
//   TODO_LIST: false,
// }

function SetDiaryOption() {
  const initialData: Record<string, boolean>[] = [];
  const [data, setData] = useState(initialData);
  const [isChecked, setIsChecked] = useState({
    ACCOUNT_BOOK: false,
    DIARY: false,
    EMOTION: false,
    TODAY_QUESTION: false,
    TODO_LIST: false,
  });

  let optionData: any = {};
  async function getOptionsData() {
    const res = await axios.get('/api/user/option', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    optionData = await res.data.createOption;
    setData(optionData);
  }
  useEffect(() => {
    getOptionsData();
  }, []);

  async function patchCheckData(obj: Record<string, boolean>) {
    const data = {
      firstLogin: false,
      createOption: obj,
    };
    console.log('전송되는 데이터', data);
    try {
      // 왜 403 에러? 토큰을 정상적으로 보내주는데 토큰이 없다고 뜸..!
      const res = await axios.patch('/api/user/option', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: data,
      });
      console.log('patch에 대한 응답', res);
    } catch (e) {
      throw new Error();
    }
  }

  const checkedHandler = (e: OptionEnums) => {
    const newData = { ...isChecked };
    newData[e] = !newData[e];
    console.log('set 해주기 전(보낼데이터)', newData);
    setIsChecked(newData);
    console.log('여기서 바뀜', isChecked); // 근데 왜 한박자 또 느릴까?
    patchCheckData(newData);
  };

  return (
    <Container>
      <div className="justify-self-start">작성페이지 옵션 설정</div>
      <ScriptArea>
        <Script>1. 일일 결산을할 때 고정적으로 적용할 옵션을 설정하는 페이지 입니다.</Script>
        <Script>2. 원하는 옵션을 체크하고 자신만의 결산 템플릿을 만들어 보세요!</Script>
      </ScriptArea>
      <CheckboxArea>
        <div>
          <CheckLabel htmlFor="todoCheck">
            <CheckInput
              type="checkbox"
              id="todoCheck"
              checked={isChecked.TODO_LIST}
              onChange={() => {
                checkedHandler(OptionEnums.TODO_LIST);
              }}
            />
            Todo 리스트 작성
          </CheckLabel>
          <p>👉 TodoList를 쓰고 관리할 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="questionCheck">
            <CheckInput
              type="checkbox"
              id="questionCheck"
              checked={isChecked.TODAY_QUESTION}
              onChange={() => {
                checkedHandler(OptionEnums.TODAY_QUESTION);
              }}
            />
            오늘의 질문
          </CheckLabel>
          <p>👉 매일 새로운 질문을 랜덤으로 받아볼 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="diaryCheck">
            <CheckInput
              type="checkbox"
              id="diaryCheck"
              checked={isChecked.DIARY}
              onChange={() => {
                checkedHandler(OptionEnums.DIARY);
              }}
            />
            일기 작성
          </CheckLabel>
          <p>👉 일기를 쓰고 오늘 하루를 마무리 해보세요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="diaryCheck">
            <CheckInput
              type="checkbox"
              id="diaryCheck"
              checked={isChecked.EMOTION}
              onChange={() => {
                checkedHandler(OptionEnums.EMOTION);
              }}
            />
            하루 감정
          </CheckLabel>
          <p>👉 오늘 하루 느꼈던 감정을 기록할 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="diaryCheck">
            <CheckInput
              type="checkbox"
              id="diaryCheck"
              checked={isChecked.ACCOUNT_BOOK}
              onChange={() => {
                checkedHandler(OptionEnums.ACCOUNT_BOOK);
              }}
            />
            가계부
          </CheckLabel>
          <p>👉 카테고리별로 오늘 지출/수익을 관리할 수 있어요!</p>
        </div>
      </CheckboxArea>
    </Container>
  );
}

export default SetDiaryOption;

const Container = tw.div`
  flex
  flex-col
  w-full
`;

const ScriptArea = tw.div`
  flex
  flex-col
  justify-center
  items-start
  my-10
  w-11/12
  mx-auto
  space-y-2
  shadow-xl
  p-8
  rounded-lg
  bg-neutral-100
`;

const Script = tw.div`
  text-lg
  text-bold
`;

const CheckboxArea = tw.div`
  flex
  flex-col
  justify-center
  items-start
  space-y-6
  my-4
  w-11/12
  mx-auto
`;

const CheckLabel = tw.label`
  text-2xl
  text-black
  flex
  flex-row
  items-center
  w-full
  select-none
`;

const CheckInput = tw.input`
  w-5
  h-5
  mr-3
  my-auto
`;
