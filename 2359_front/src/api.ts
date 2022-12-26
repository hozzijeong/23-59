import axios from 'axios';
import { DiaryBodyProps } from 'types/interfaces';

const baseAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

const headerAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

const updateDiary = ({ _id, body }: { _id: string; body: DiaryBodyProps }) =>
  headerAxios.patch(`/api/contents/${_id}`, { ...body, contentId: _id });

const createDiary = (body: DiaryBodyProps) => headerAxios.post(`/api/contents`, body);

const deleteDiary = (_id: string) =>
  headerAxios.delete(`/api/contents/${_id}`, {
    data: {
      contentId: _id,
    },
  });
const getRandomQuestion = () => baseAxios.get('/api/questions/random').then((res) => res.data);
export { baseAxios, updateDiary, createDiary, deleteDiary, getRandomQuestion };
