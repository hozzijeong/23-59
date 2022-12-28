import { RegisterFormValue } from 'types/interfaces';
import { useCallback, useState } from 'react';
import { baseAxios } from '../api';
import { errorData } from '../types/interfaces';

const useRegister = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [error, setError] = useState<errorData>();
  const [isOk, setIsOk] = useState<boolean>(false);

  const registerRequest = useCallback((Data: RegisterFormValue) => {
    baseAxios
      .post(`api/user/register`, Data)
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
  return { registerRequest, error, isModal, setIsModal, isOk, setIsOk };
};

export default useRegister;
