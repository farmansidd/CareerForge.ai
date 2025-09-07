// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store'; // Import persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Wrap App with PersistGate */}
      <App />
    </PersistGate>
  </Provider>
);
