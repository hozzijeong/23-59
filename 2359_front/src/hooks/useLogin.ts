import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginFormValue } from 'types/interfaces';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

export function useLogin(Data: LoginFormValue) {
  const navigate = useNavigate();
  axios
    .post(
      `http://localhost:8000/api/user/login/
    `,
      Data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      localStorage.setItem('user', res.data);
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    });
}
