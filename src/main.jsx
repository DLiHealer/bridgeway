import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import './index.css';
import './i18n';
import { AppProvider } from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);