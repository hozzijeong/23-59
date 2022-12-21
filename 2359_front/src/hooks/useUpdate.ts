import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormValue } from '../components/signup/Userform';

/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

export const useUpdate = (Data: FormValue) => {
  const navigate = useNavigate();

  axios
    .patch(
      `localhost:8000/api/user/info/
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
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    });
};
