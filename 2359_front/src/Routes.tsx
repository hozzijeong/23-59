import React from 'react';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import Diary from 'pages/Diary';
import Home from 'pages/Home';
import MyPage from 'pages/MyPage';
import UserInfo from 'components/mypage/UserInfo';
import Login from 'pages/Login';
import SetDiaryOption from 'components/mypage/SetDiaryOption';
import EmotionStatistics from 'components/mypage/EmotionStatistics';
import AccountStatistics from 'components/mypage/AccountStatistics';
import CollectQuestion from 'components/mypage/CollectQuestion';
import SignUp from './pages/SignUp';

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
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
}
