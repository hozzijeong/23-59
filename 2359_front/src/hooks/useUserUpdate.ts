import { baseAxios } from 'api';
import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateFormValue } from 'types/interfaces';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
const useUserUpdate = () => {
  const userUpdateRequest = useCallback((data: UpdateFormValue) => {
    baseAxios
      .patch(`/api/user/info`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        alert('수정 되었습니다');
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return { userUpdateRequest };
};

export default useUserUpdate;
