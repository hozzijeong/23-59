import React from 'react';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';

import Diary from './Diary';
import Landing from './Landing';
import PageLayout from './PageLayout';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/user" element={<PageLayout />}>
        <Route path="diary" element={<Diary />} />
      </Route>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
}
