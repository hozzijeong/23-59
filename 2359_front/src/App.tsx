import React from 'react';
import GlobalStyle from './GlobalStyle';
import PageLayout from './pages/PageLayout';
import { Routes } from './pages/Routes';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <PageLayout>
        <Routes />
      </PageLayout>
    </>
  );
}
