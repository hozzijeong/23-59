import axios from 'axios';
import { DiaryBodyProps } from 'types/interfaces';

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

const updateDiary = ({ _id, body }: { _id: string; body: DiaryBodyProps }) =>
  baseAxios.patch(`/api/contents/${_id}`, { ...body, contentId: _id });

const createDiary = (body: DiaryBodyProps) => baseAxios.post(`/api/contents`, body);

const deleteDiary = (_id: string) =>
  baseAxios.delete(`/api/contents/${_id}`, {
    data: {
      contentId: _id,
    },
  });

export { baseAxios, updateDiary, createDiary, deleteDiary };
