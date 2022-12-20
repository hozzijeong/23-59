import React from 'react';
import tw from 'tailwind-styled-components';

function SetDiaryOption() {
  return (
    <Container>
      <div className="justify-self-start">작성페이지 옵션 설정</div>
      <ScriptDiv>
        <Script>1. 일일 결산을할 때 고정적으로 적용할 옵션을 설정하는 페이지 입니다.</Script>
        <Script>2. 원하시는 옵션을 체크하고 자신만의 결산 템플릿을 만들어 보세요!</Script>
      </ScriptDiv>
      <CheckboxArea>
        <div>
          <CheckLabel htmlFor="todoCheck">
            <CheckInput type="checkbox" id="todoCheck" checked />
            Todo 리스트 작성 <span style={{ fontSize: '15px' }}> (기본 설정)</span>
          </CheckLabel>
          <p>👉 TodoList를 쓰고 관리할 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="questionCheck">
            <CheckInput type="checkbox" id="questionCheck" />
            오늘의 질문
          </CheckLabel>
          <p>👉 매일 새로운 질문을 랜덤으로 받아볼 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="diaryCheck">
            <CheckInput type="checkbox" id="diaryCheck" />
            감정 일기
          </CheckLabel>
          <p>👉 일기를 쓰고 오늘의 감정을 선택할 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="diaryCheck">
            <CheckInput type="checkbox" id="diaryCheck" />
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

const ScriptDiv = tw.div`
  flex
  flex-col
  justify-center
  items-start
  my-10
  w-11/12
  mx-auto
  space-y-4
`;

const Script = tw.div`
  text-xl
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
