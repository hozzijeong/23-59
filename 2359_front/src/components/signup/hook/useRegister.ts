import axios from 'axios';
import React from 'react';
import { FormValue } from '../Userform';
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

export const useRegister = (Data: FormValue) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/signup`, Data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      alert('가입 완료 됐습니다.');
      window.location.href = '/login';
    })
    .catch((err) => {
      console.log(err);
    });
};
