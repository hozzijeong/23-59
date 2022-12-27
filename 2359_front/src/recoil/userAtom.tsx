import React from 'react';
import { atom } from 'recoil';

const userLogin = atom({
  key: 'userLogin',
  default: false,
});

export { userLogin };
