import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalStyle from './styles/global';
import Routes from './routes';
import { store, persistor } from './redux/store';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthProvider>
      </PersistGate>
    </Provider>
    <GlobalStyle />
  </>
);

export default App;
