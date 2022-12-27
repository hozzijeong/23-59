import axios from 'axios';
import { DiaryBodyProps } from 'types/interfaces';

const baseAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const headerAxios = (token: string) => {
  return axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateDiary = ({ _id, body }: { _id: string; body: DiaryBodyProps }) => {
  const token = localStorage.getItem('token') ?? '';
  return headerAxios(token).patch(`/api/contents/${_id}`, { ...body, contentId: _id });
};

const createDiary = (body: DiaryBodyProps) => {
  const token = localStorage.getItem('token') ?? '';
  return headerAxios(token).post(`/api/contents`, body);
};

const deleteDiary = (_id: string) => {
  const token = localStorage.getItem('token') ?? '';

  return headerAxios(token).delete(`/api/contents/${_id}`, {
    data: {
      contentId: _id,
    },
  });
};
const getRandomQuestion = () => baseAxios.get('/api/questions/random').then((res) => res.data);

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token') ?? '';
  const res = await headerAxios(token).get(url);
  return res.data;
};

export { headerAxios, baseAxios, updateDiary, createDiary, deleteDiary, getRandomQuestion, fetcher };
