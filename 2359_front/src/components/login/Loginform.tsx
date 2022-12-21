import React from 'react';
import tw from 'tailwind-styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailCheck } from '../../utilities/regex';
import * as SC from '../signup/FormStyled';
import { useLogin } from '../../hooks/useLogin';
import { LoginFormValue } from 'types/interfaces';

/* eslint-disable react/jsx-props-no-spreading */

function Loginform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>();

  const OnSubmit: SubmitHandler<LoginFormValue> = (data) => {
    console.log(data);
    useLogin(data);
  };

  return (
    <SC.Container>
      <SC.Form onSubmit={handleSubmit(OnSubmit)}>
        <SC.FormTitle>로그인</SC.FormTitle>
        <SC.FormLabel>이메일</SC.FormLabel>
        <SC.FormInput type="email" {...register('email', { required: true, pattern: emailCheck })} />
        {errors.email && errors.email.type === 'required' && <SC.ErrorMesg>이메일을 입력해주세요.</SC.ErrorMesg>}
        {errors.email && errors.email.type === 'pattern' && <SC.ErrorMesg>올바른 이메일을 입력해주세요.</SC.ErrorMesg>}
        <SC.FormLabel>비밀번호</SC.FormLabel>
        <SC.FormInput type="password" {...register('password', { required: true, minLength: 6 })} />
        {errors.password && errors.password.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <SC.ErrorMesg>6자 이상으로 입력해주세요.</SC.ErrorMesg>
        )}
        <SC.SubmitButton type="submit">로그인</SC.SubmitButton>
        <SC.SignUpLink href="signup">SignUp</SC.SignUpLink>
      </SC.Form>
    </SC.Container>
  );
}

export default Loginform;
