import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './utils/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { EnquiryModalProvider } from './context/EnquiryModalContext';
import './index.css';


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
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
    </GoogleOAuthProvider>
  );
}

export default App;
