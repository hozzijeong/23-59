import { RegisterFormValue } from 'types/interfaces';
import { useCallback } from 'react';
import { baseAxios } from 'api';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
const useUserData = () => {
  const userDataRequest = useCallback(() => {
    baseAxios
      .get(`/api/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // em..
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return { userDataRequest };
};

export default useUserData;
