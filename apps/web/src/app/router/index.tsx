import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from '../../components/loading';

const Home = React.lazy(() => import('../../pages/home'));
const NotFound = React.lazy(() => import('../../pages/not-found'));

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={'/'}
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path={'*'}
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
