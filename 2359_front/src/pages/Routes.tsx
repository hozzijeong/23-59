import React from 'react';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import Diary from 'pages/Diary';
import Landing from 'pages/Landing';
import MyPage from './MyPage';
import UserInfo from '../components/mypage/UserInfo';
import SetDiaryOption from '../components/mypage/SetDiaryOption';
import EmotionStatistics from '../components/mypage/EmotionStatistics';
import AccountStatistics from '../components/mypage/AccountStatistics';
import CollectQuestion from '../components/mypage/CollectQuestion';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/mypage" element={<MyPage />}>
        <Route path="user" element={<UserInfo />} />
        <Route path="select-option" element={<SetDiaryOption />} />
        <Route path="emotion" element={<EmotionStatistics />} />
        <Route path="account" element={<AccountStatistics />} />
        <Route path="collect-question" element={<CollectQuestion />} />
      </Route>
      <Route path="/diary" element={<Diary />} />
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
}
