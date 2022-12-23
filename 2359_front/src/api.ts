import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// const headerAxios = axios.create({
//   baseURL: 'http://localhost:8000',
//   withCredentials: true,
//   headers: {
//     Authorization: `Bearer` + localStorage.getItem('user'),
//   },
// });
// 헤더에 보내는게 왜 안되는지 모르겠음 .

export { baseAxios };
