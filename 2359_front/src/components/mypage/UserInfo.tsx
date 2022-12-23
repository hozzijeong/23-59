import React, { useCallback, useEffect } from 'react';
import ModalBasic from 'components/ModalBasic';
import { useRecoilState } from 'recoil';
import { showModalPage } from 'recoil/modalAtom';
import { useNavigate } from 'react-router-dom';
import useUserDelete from 'hooks/useUserDelete';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UpdateFormValue } from '../../types/interfaces';
import * as SC from '../signup/FormStyled';
import useUserUpdate from '../../hooks/useUserUpdate';
import { baseAxios } from '../../api';
import { emailCheck } from '../../utilities/regex';
/* eslint-disable react/jsx-props-no-spreading */

function UserInfo() {
  const [showModal, setShowModal] = useRecoilState(showModalPage);
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

  // 유저 정보 가져오기
  const userDataRequest = useCallback(() => {
    baseAxios
      .get(`/api/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setValue('email', res.data.email);
        setValue('nickname', res.data.nickname);
      })
      .catch((err) => {
        alert('로그인 해주세요!');
        navigation('/login');
      });
  }, []);

  useEffect(() => {
    userDataRequest();
  }, []);

  const OnSubmit: SubmitHandler<UpdateFormValue> = (data) => {
    const formdata = {
      currentPassword: data.currentPassword,
      nickname: data.nickname,
      password: data.password,
    };
    userUpdateRequest(formdata);
    setValue('password', '');
    setValue('currentPassword', '');
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
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        {errors.email && errors.email.type === 'required' && <SC.ErrorMesg>이메일을 입력해주세요.</SC.ErrorMesg>}
        {errors.email && errors.email.type === 'pattern' && <SC.ErrorMesg>올바른 이메일을 입력해주세요.</SC.ErrorMesg>}
        <SC.FormLabel>닉네임</SC.FormLabel>
        <SC.FormInput
          {...register('nickname', { required: true, maxLength: 10 })}
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
          autoComplete="new-password"
          {...register('currentPassword', { required: true, minLength: 6 })}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        {errors.currentPassword && errors.currentPassword.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        <SC.FormLabel>새로운 비밀 번호</SC.FormLabel>
        <SC.FormInput
          {...register('password', {
            required: true,
            minLength: 6,
            validate: (value) => value !== watch('currentPassword'),
          })}
          autoComplete="off"
          type="password"
          placeholder="새로운 비밀번호를 입력해주세요"
        />
        {errors.password && errors.password.type === 'validate' && (
          <SC.ErrorMesg>다른 비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <SC.ErrorMesg>6자 이상으로 설정해주세요.</SC.ErrorMesg>
        )}
        {errors.password && errors.password.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        <SC.SubmitButton type="submit">회원수정</SC.SubmitButton>
        <SC.DeleteTag
          onClick={() => {
            setShowModal(true);
          }}
        >
          회원탈퇴
        </SC.DeleteTag>
      </SC.Form>
      {showModal && (
        <ModalBasic title="회원 탈퇴" btnclose="취소" btnsave="탈퇴" saveHandler={userDelete}>
          정말 탈퇴 하시겠습니까..?
        </ModalBasic>
      )}
    </SC.Container>
  );
}

export default UserInfo;
