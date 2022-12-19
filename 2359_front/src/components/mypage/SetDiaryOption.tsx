import React from 'react';
import tw from 'tailwind-styled-components';

// import { useParams } from 'react-router-dom';

function SetDiaryOption() {
  return (
    <Container>
      <div className="justify-self-start">작성페이지 옵션 설정</div>
      <ScriptDiv>
        1. 일일 결산을할 때 고정적으로 적용할 옵션을 설정하는 페이지 입니다.
        <br />
        2. 원하시는 옵션을 체크하고 자신만의 결산 템플릿을 만들어 보세요!
      </ScriptDiv>
      <CheckboxArea>
        <div>
          <input type="checkbox" />
          <div style={{ display: 'inline-block' }}>To-Do 리스트 작성</div>
          <p>TodoList를 쓰고 관리할 수 있어요!</p>
        </div>
        <div>
          <input type="checkbox" />
          <div style={{ display: 'inline-block' }}>오늘의 질문</div>
          <p>매일 새로운 질문을 랜덤으로 받아볼 수 있어요!</p>
        </div>
        <div>
          <input type="checkbox" />
          <div style={{ display: 'inline-block' }}>감정 일기</div>
          <p>일기를 쓰고 오늘의 감정을 선택할 수 있어요!</p>
        </div>
      </CheckboxArea>
    </Container>
  );
}

export default SetDiaryOption;

const Container = tw.div`
  flex
  flex-col
  justify-start
  space-y-4
  w-full
`;

const CheckboxArea = tw.div`
  flex
  flex-col
  justify-center
  items-start
  space-y-4
  m-auto
  h-96
`;

const ScriptDiv = tw.div`
  flex
  justify-center
  items-center
  w-10/12
  mx-auto
  my-4
`;
