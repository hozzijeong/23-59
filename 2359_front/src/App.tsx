import PageLayout from 'pages/PageLayout';
import React, { Suspense } from 'react';
import Routes from 'Routes';
import ErrorBoundary from 'ErrorBoundary';
import { Loader } from 'components/Loader';

export default function App() {
  return (
    <ErrorBoundary fallback={<h2>Could not get fetching.</h2>}>
      <Suspense fallback={<Loader />}>
        <PageLayout>
          <Routes />
        </PageLayout>
      </Suspense>
    </ErrorBoundary>
  );
}
