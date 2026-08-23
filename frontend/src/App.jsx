import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './utils/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { EnquiryModalProvider } from './context/EnquiryModalContext';
import './index.css';


function App() {
  return (
    <AuthProvider>
      <EnquiryModalProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </EnquiryModalProvider>
    </AuthProvider>
  );
}

export default App;
