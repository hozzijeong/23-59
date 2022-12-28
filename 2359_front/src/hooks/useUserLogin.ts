import { useNavigate } from 'react-router-dom';
import { LoginFormValue } from 'types/interfaces';
import { useCallback, useState } from 'react';
import { baseAxios } from 'api';
import uuid from 'react-uuid';
import { errorData } from '../types/interfaces';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

function useLogin() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [error, setError] = useState<errorData>();

  const loginRequest = useCallback((Data: LoginFormValue) => {
    baseAxios
      .post(`/api/user/login`, Data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('tempId', uuid());
        navigate('/');
      })
      .catch((err) => {
        setIsModal(true);
        setError({
          reason: err.response.data.reason,
          result: err.response.data.result,
        });
      });
  }, []);
  return { loginRequest, error, isModal, setIsModal };
}

export default useLogin;
