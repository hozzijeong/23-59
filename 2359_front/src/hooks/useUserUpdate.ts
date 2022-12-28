import { baseAxios } from 'api';
import { useCallback, useState } from 'react';
import { UpdateFormValue } from 'types/interfaces';
import { errorData } from '../types/interfaces';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
const useUserUpdate = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [error, setError] = useState<errorData>();
  const [isOk, setIsOk] = useState<boolean>(false);

  const userUpdateRequest = useCallback((data: UpdateFormValue) => {
    baseAxios
      .patch(`/api/user/info`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setIsOk(true);
      })
      .catch((err) => {
        setIsModal(true);
        setError({
          reason: err.response.data.reason,
          result: err.response.data.result,
        });
      });
  }, []);
  return { userUpdateRequest, setIsOk, isOk, error, isModal, setIsModal };
};

export default useUserUpdate;
