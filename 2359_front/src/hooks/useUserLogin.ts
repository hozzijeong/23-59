import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginFormValue } from 'types/interfaces';
import { useCallback } from 'react';
import { baseAxios } from 'api';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

function useLogin() {
  const navigate = useNavigate();
  const loginRequest = useCallback((Data: LoginFormValue) => {
    baseAxios
      .post(`/api/user/login`, Data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return { loginRequest };
}

export default useLogin;
