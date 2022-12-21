import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UpdateFormValue } from '../../types/interfaces';
import { emailCheck } from '../../utilities/regex';
import * as SC from '../signup/FormStyled';
/* eslint-disable react/jsx-props-no-spreading */

function UserInfo() {
  const [state, setState] = useState('ghd@nav.com');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateFormValue>();

  useEffect(() => {
    // axios.get('')
    // 만약 유저가 회원 수정 페이지로 들어오면
    // axios.get으로 유저 정보를 불러오고, 그 정보를 setValue로 넣어준다.?
    setValue('email', state);
    setValue('nickname', state);
  }, []);

  const OnSubmit: SubmitHandler<UpdateFormValue> = (data) => {
    const formdata = {
      currentPassword: data.newPassword,
      nickname: data.nickname,
      password: data.password,
    };
    console.log(formdata);
  };

  return (
    <SC.Container>
      <SC.Form onSubmit={handleSubmit(OnSubmit)}>
        <SC.FormTitle>회원 정보 수정</SC.FormTitle>
        <SC.FormLabel>이메일</SC.FormLabel>
        <SC.FormInput
          readOnly
          {...register('email', {
            required: '필수 응답 항목입니다.',
            pattern: { value: emailCheck, message: '이메일 형식이 아닙니다.' },
          })}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        {errors.email && errors.email.type === 'required' && <SC.ErrorMesg>이메일을 입력해주세요.</SC.ErrorMesg>}
        {errors.email && errors.email.type === 'pattern' && <SC.ErrorMesg>올바른 이메일을 입력해주세요.</SC.ErrorMesg>}
        <SC.FormLabel>닉네임</SC.FormLabel>
        <SC.FormInput
          {...register('nickname', { required: true, maxLength: 10 })}
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
        />
        {errors.nickname && errors.nickname.type === 'required' && <SC.ErrorMesg>닉네임을 입력해주세요.</SC.ErrorMesg>}
        {errors.nickname && errors.nickname.type === 'pattern' && (
          <SC.ErrorMesg>올바른 닉네임을 입력해주세요.</SC.ErrorMesg>
        )}
        {errors.nickname && errors.nickname.type === 'maxLength' && (
          <SC.ErrorMesg>10자 이하로 설정해주세요.</SC.ErrorMesg>
        )}
        <SC.FormLabel>현재 비밀번호</SC.FormLabel>
        <SC.FormInput
          {...register('password', { required: true, minLength: 6 })}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        {errors.password && errors.password.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        {/* 데이터로 받아온 비밀번호가 일치하지 않을 때 ? {errors.password && errors.password.type === 'minLength' && (
          <SC.ErrorMesg>비밀번호가 일치하지 않습니다.</SC.ErrorMesg>
        )} */}
        <SC.FormLabel>새로운 비밀 번호</SC.FormLabel>
        <SC.FormInput
          {...register('newPassword', {
            required: true,
            minLength: 6,
          })}
          name="newPassword"
          type="password"
          placeholder="새로운 비밀번호를 입력해주세요"
        />
        {errors.newPassword && errors.newPassword.type === 'minLength' && (
          <SC.ErrorMesg>6자 이상으로 설정해주세요.</SC.ErrorMesg>
        )}
        {errors.newPassword && errors.newPassword.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        <SC.SubmitButton type="submit">회원수정</SC.SubmitButton>
        <SC.SubmitButton
          delete
          onClick={() => {
            console.log('삭제버튼 클릭');
          }}
        >
          회원탈퇴
        </SC.SubmitButton>
      </SC.Form>
    </SC.Container>
  );
}

export default UserInfo;
