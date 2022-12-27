import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { LoginFormValue } from '../../types/interfaces';
import {
  ErrorMesg,
  SubmitButton,
  FormInput,
  FormLabel,
  FormTitle,
  Form,
  Container,
  SignUpLink,
} from '../signup/FormStyled';
import { EMAIL_REGEX } from '../../utilities/regex';
import useLogin from '../../hooks/useUserLogin';
/* eslint-disable react/jsx-props-no-spreading */

function Loginform() {
  const { loginRequest } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>();

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    loginRequest(data);
  };

  return (
    <Container>
      <WelcomeLogo>
        <FirstLine>당신의 하루는 어떠셨나요?</FirstLine>
        <SecondLine>
          <br /> 하루의 끝, “23:59”
        </SecondLine>
      </WelcomeLogo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>로그인</FormTitle>
        <FormLabel>이메일</FormLabel>
        <FormInput type="email" {...register('email', { required: true, pattern: EMAIL_REGEX })} />
        {errors.email && errors.email.type === 'required' && <ErrorMesg>이메일을 입력해주세요.</ErrorMesg>}
        {errors.email && errors.email.type === 'pattern' && <ErrorMesg>올바른 이메일을 입력해주세요.</ErrorMesg>}
        <FormLabel>비밀번호</FormLabel>
        <FormInput
          autoComplete="new-password"
          {...register('password', { required: true, minLength: 6 })}
          type="password"
        />
        {errors.password && errors.password.type === 'required' && <ErrorMesg>비밀번호를 입력해주세요.</ErrorMesg>}
        {errors.password && errors.password.type === 'minLength' && <ErrorMesg>6자 이상으로 입력해주세요.</ErrorMesg>}
        <SubmitButton type="submit">로그인</SubmitButton>
        <SignUpLink>
          <Link to="/signup">Signup</Link>
        </SignUpLink>
      </Form>
    </Container>
  );
}

export default Loginform;

const WelcomeLogo = tw.span`
  mb-[20px]
  animate-pulse	
  text-primaryLight
  font-['LABDigital'] 
  text-bold 
  italic 
  text-[black] 
  text-center
`;

const FirstLine = tw.span`
text-[20px]
`;

const SecondLine = tw.span`
text-[18px]
`;
