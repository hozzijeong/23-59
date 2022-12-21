import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RegisterFormValue } from 'types/interfaces';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

export const useRegister = (Data: RegisterFormValue) => {
  const navigate = useNavigate();
  axios
    .post(
      `http:localhost:8000/api/user/register/
    `,
      Data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      const data = res;
      console.log(data);
      alert('가입 완료 됐습니다.');
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
};
