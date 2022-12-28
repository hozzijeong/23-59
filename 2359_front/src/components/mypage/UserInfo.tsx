import React, { useCallback, useEffect, useState } from 'react';
import ModalBasic from 'components/ModalBasic';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import useUserDelete from 'hooks/useUserDelete';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UpdateFormValue } from '../../types/interfaces';
import {
  ErrorMesg,
  SubmitButton,
  FormInput,
  FormLabel,
  FormTitle,
  Form,
  Container,
  DeleteTag,
} from '../signup/FormStyled';
import useUserUpdate from '../../hooks/useUserUpdate';
import { baseAxios, headerAxios } from '../../api';
import { EMAIL_REGEX } from '../../utilities/regex';
/* eslint-disable react/jsx-props-no-spreading */

function UserInfo() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();
  const { userUpdateRequest } = useUserUpdate();
  const { userDelete } = useUserDelete();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateFormValue>();

  const fetcher = async (url: string) => {
    const token = localStorage.getItem('token') ?? '';
    const res = await headerAxios(token).get(url);
    return res.data;
  };

  const { data } = useSWR(`/api/user/info`, fetcher);

  useEffect(() => {
    if (data) {
      const { email, nickname } = data;
      setValue('email', email);
      setValue('nickname', nickname);
    }
  });

  const onSubmit: SubmitHandler<UpdateFormValue> = (data) => {
    userUpdateRequest(data);
    setValue('password', '');
    setValue('currentPassword', '');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>회원 정보 수정</FormTitle>
        <FormLabel>이메일</FormLabel>
        <FormInput
          readOnly
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
        <FormLabel>현재 비밀번호</FormLabel>
        <FormInput
          autoComplete="new-password"
          {...register('currentPassword', { required: true, minLength: 6 })}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        {errors.currentPassword && errors.currentPassword.type === 'required' && (
          <ErrorMesg>비밀번호를 입력해주세요.</ErrorMesg>
        )}
        <FormLabel>새로운 비밀 번호</FormLabel>
        <FormInput
          {...register('password', {
            required: true,
            minLength: 6,
            validate: (value) => value !== watch('currentPassword'),
          })}
          autoComplete="off"
          type="password"
          placeholder="새로운 비밀번호를 입력해주세요"
        />
        {errors.password && errors.password.type === 'validate' && <ErrorMesg>다른 비밀번호를 입력해주세요.</ErrorMesg>}
        {errors.password && errors.password.type === 'minLength' && <ErrorMesg>6자 이상으로 설정해주세요.</ErrorMesg>}
        {errors.password && errors.password.type === 'required' && <ErrorMesg>비밀번호를 입력해주세요.</ErrorMesg>}
        <SubmitButton type="submit">회원수정</SubmitButton>
        <DeleteTag
          onClick={() => {
            setShowModal(true);
          }}
        >
          회원탈퇴
        </DeleteTag>
      </Form>
      {showModal && (
        <ModalBasic
          title="회원 탈퇴"
          closeText="취소"
          submitText="탈퇴"
          cancelHandler={() => setShowModal(false)}
          submitHandler={userDelete}
        >
          정말 탈퇴 하시겠습니까..?
        </ModalBasic>
      )}
    </Container>
  );
}

export default UserInfo;
