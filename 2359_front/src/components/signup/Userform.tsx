import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX } from '../../utilities/regex';
import useRegister from '../../hooks/useUserRegister';
import { ErrorMesg, SubmitButton, FormInput, FormLabel, FormTitle, Form, Container } from './FormStyled';
import { RegisterFormValue } from '../../types/interfaces';

/* eslint-disable react/jsx-props-no-spreading */

function Userform() {
  const { registerRequest } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValue>();

  // data를 보낸다.
  const onSubmit: SubmitHandler<RegisterFormValue> = (data) => {
    registerRequest(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>회원가입</FormTitle>
        <FormLabel>이메일</FormLabel>
        <FormInput
          {...register('email', {
            required: '필수 응답 항목입니다.',
            pattern: { value: EMAIL_REGEX, message: '이메일 형식이 아닙니다.' },
          })}
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        {errors.email && errors.email.type === 'required' && <ErrorMesg>이메일을 입력해주세요.</ErrorMesg>}
        {errors.email && errors.email.type === 'pattern' && <ErrorMesg>올바른 이메일을 입력해주세요.</ErrorMesg>}
        <FormLabel>닉네임</FormLabel>
        <FormInput
          {...register('nickname', { required: true, maxLength: 10 })}
          type="text"
          placeholder="닉네임을 입력해주세요"
        />
        {errors.nickname && errors.nickname.type === 'required' && <ErrorMesg>닉네임을 입력해주세요.</ErrorMesg>}
        {errors.nickname && errors.nickname.type === 'pattern' && <ErrorMesg>올바른 닉네임을 입력해주세요.</ErrorMesg>}
        {errors.nickname && errors.nickname.type === 'maxLength' && <ErrorMesg>10자 이하로 설정해주세요.</ErrorMesg>}
        <FormLabel>비밀번호</FormLabel>
        <FormInput
          autoComplete="new-password"
          {...register('password', { required: true, minLength: 6 })}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        {errors.password && errors.password.type === 'required' && <ErrorMesg>비밀번호를 입력해주세요.</ErrorMesg>}
        {errors.password && errors.password.type === 'minLength' && <ErrorMesg>6자 이상으로 설정해주세요.</ErrorMesg>}
        <FormLabel>비밀번호 확인</FormLabel>
        <FormInput
          autoComplete="new-password"
          {...register('passwordConfirm', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {errors.passwordConfirm && errors.passwordConfirm.type === 'validate' && (
          <ErrorMesg>비밀번호가 일치하지 않습니다.</ErrorMesg>
        )}
        {errors.passwordConfirm && errors.passwordConfirm.type === 'required' && (
          <ErrorMesg>비밀번호를 입력해주세요.</ErrorMesg>
        )}
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    </Container>
  );
}

export default Userform;
