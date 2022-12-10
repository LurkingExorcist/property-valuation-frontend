import * as Redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ModalProvider, NotificationsProvider } from './components';
import { AppRoutes } from './routes';
import { store } from './store';

function App() {
  return (
    <Redux.Provider store={store}>
      <BrowserRouter>
        <NotificationsProvider>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </NotificationsProvider>
      </BrowserRouter>
    </Redux.Provider>
  );
}

export default App;
