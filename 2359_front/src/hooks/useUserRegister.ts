import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RegisterFormValue } from 'types/interfaces';
import { useCallback } from 'react';
import { baseAxios } from '../api';

const useRegister = () => {
  const navigate = useNavigate();

  const registerRequest = useCallback((Data: RegisterFormValue) => {
    baseAxios
      .post(`api/user/register`, Data)
      .then((res) => {
        alert('가입 완료 됐습니다.');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { registerRequest };
};

export default useRegister;
