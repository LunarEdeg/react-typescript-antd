import React, { FC, Suspense } from 'react';
import { Provider } from 'react-redux';

import PageLoading from 'components/Loading';
import store from './store';

import Routes from './router';

const App: FC = () => (
  <Suspense fallback={<PageLoading />}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </Suspense>
);

export default App;
