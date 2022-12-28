import { baseAxios } from 'api';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

const useUserDelete = () => {
  const [isDel, setIsDel] = useState<boolean>(false);

  const userDelete = useCallback(() => {
    baseAxios
      .delete(`/api/user/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        localStorage.clear();
        setIsDel(true);
      })
      .catch((err) => {
        alert(err.response.data.reason);
      });
  }, []);
  return { userDelete, isDel, setIsDel };
};

export default useUserDelete;
