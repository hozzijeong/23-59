import axios from 'axios';
import { baseAxios } from 'api';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

const useUserDelete = () => {
  const navigate = useNavigate();
  const userDelete = useCallback(() => {
    baseAxios
      .delete(`/api/user/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        localStorage.removeItem('token');
        alert('이용해주셔서 감사합니다.');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { userDelete };
};

export default useUserDelete;
