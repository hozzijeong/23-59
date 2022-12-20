import React, { useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
/* eslint-disable react/jsx-props-no-spreading */

interface FormValue {
  errors: {
    email: { message: string };
  };
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const OnHandleSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
    console.log(errors);
  };

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  return (
    <Container>
      <Form onSubmit={handleSubmit(OnHandleSubmit)}>
        <FormTitle>회원 가입</FormTitle>
        <FormLabel>이메일</FormLabel>
        <FormInput
          {...register('email', { required: 'Please write valid email', pattern: /^\S+@\S+$/i })}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        <ErrorMesg>{errors?.email?.message}</ErrorMesg>
        <FormLabel>닉네임</FormLabel>
        <FormInput
          {...register('nickname', { required: 'Please write valid nickname', maxLength: 10 })}
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          className={`form-control ${errors.nickname ? 'is-invalid' : ''}`}
        />
        <ErrorMesg>{errors?.nickname?.message}</ErrorMesg>

        <FormLabel>비밀번호</FormLabel>
        <FormInput
          {...register('password', { required: 'Please write valid password', minLength: 6 })}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <ErrorMesg>{errors?.password?.message}</ErrorMesg>

        <FormLabel>비밀번호 확인</FormLabel>
        <FormInput
          {...register('passwordConfirm', {
            required: 'Please write valid password',
            validate: (value) => value === passwordRef.current,
          })}
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <ErrorMesg>{errors?.passwordConfirm?.message}</ErrorMesg>
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    </Container>
  );
}

const Container = tw.div`
flex
justify-center
items-center
w-auto
border
border-[red]
`;

const Form = tw.form`
mx-auto
flex
flex-col
items-start
p-6
border
border-[#3F51A2]
`;

const FormTitle = tw.div`
  text-4xl
  mx-auto
  mt-auto
  flex
  justify-center
  items-center
  mb-4
  `;

const FormLabel = tw.div`
  text-xl
  `;

const FormInput = tw.input`
  mx-auto
  mt-auto
  rounded-xl
  w-[220px]
  `;

const SubmitButton = tw.button`
mx-auto
mt-auto
bg-[#A69B97]  rounded-[10px]
text-2xl
w-40
`;

const ErrorMesg = tw.span`
text-[red]
`;

export default SignUp;
