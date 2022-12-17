import React from 'react';
import tw from 'tailwind-styled-components';
// import { Link } from 'react-router-dom';

export const ContentContainer = tw.div`
  w-full
  flex
  flex-col
  justify-center
  items-center
`;

const ModifyInfoForm = tw.form`
  space-y-4
  w-1/2
  flex
  flex-col
  justify-center
  items-center
`;

function WithdrawalAlert(): void {
  window.confirm('정말로 탈퇴하시겠습니까?');
}

function ModifyAlert(): void {
  alert('수정이 완료 되었습니다!');
}

function UserInfo() {
  return (
    <ContentContainer>
      <ModifyInfoForm>
        <div>회원 정보 수정</div>
        <div>
          <p>이메일</p>
          <input type="email" placeholder="example@example.com" readOnly />
        </div>
        <div>
          <p>비밀번호 수정</p>
          <input type="password" />
        </div>
        <div>
          <p>비밀번호 확인</p>
          <input type="password" />
          <p>비밀번호가 일치하지 않습니다</p>
        </div>
        <div>
          <p>닉네임 수정</p>
          <input type="text" placeholder="닉네임을 입력해주세요" />
        </div>
        <div>
          <button type="button" onClick={() => ModifyAlert()}>
            수정하기
          </button>
        </div>
        <div>
          <button type="button" onClick={() => WithdrawalAlert()}>
            회원 탈퇴하기→
          </button>
        </div>
      </ModifyInfoForm>
    </ContentContainer>
  );
}

export default UserInfo;
