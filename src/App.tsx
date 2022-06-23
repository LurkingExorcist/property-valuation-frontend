import * as React from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from './router';
import { store } from './store';
import { NotificationsWrapper, ModalsWrapper } from './wrappers';
React.Suspense;
function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <NotificationsWrapper>
          <ModalsWrapper>
            <AppRouter />
          </ModalsWrapper>
        </NotificationsWrapper>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
