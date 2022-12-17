import React from 'react';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import Diary from 'pages/Diary';
import Landing from 'pages/Landing';
import SignUp from './SignUp';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/diary" element={<Diary />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
}
