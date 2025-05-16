import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// pages
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Login from './pages/Login';
import Modules from './pages/Modules';
import Practicals from './pages/Practicals';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Tools from './pages/Tools';
import Units from './pages/Units';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import VerifyEmailPrompt from './pages/VerifyEmailPrompt';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VerifyEmail from './components/VerifyEmail';

import PrivateRoute from './PrivateRoute';
import ScrollToTop from './components/ScrollUp';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';
import VerifiedUsersRoute from './VerifiedUsersRoute';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/userSlice';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();
  const tokenExpiresAt = useSelector(state => state.user.tokenExpiresAt);

  useEffect(() => {
      const checkTokenExpiration = () => {
          if (tokenExpiresAt && Date.now() >= tokenExpiresAt) {
              dispatch(logout());
          }
      };

      checkTokenExpiration();
      const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

      return () => clearInterval(intervalId);
  }, [dispatch, tokenExpiresAt]);


  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
        <div className="content-container">
          <ScrollToTop/>
          <Routes>
            <Route index element={<RedirectIfAuthenticated><Home /></RedirectIfAuthenticated>} />
            <Route path="/dashboard" element={<VerifiedUsersRoute><Dashboard /></VerifiedUsersRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/modules/:courseId" element={<VerifiedUsersRoute><Modules /></VerifiedUsersRoute>} />
            <Route path="/units/:courseId/:moduleId" element={<PrivateRoute><VerifiedUsersRoute><Units /></VerifiedUsersRoute></PrivateRoute>} />
            <Route path="/lessons/:courseId/:moduleId/:unitId" element={<PrivateRoute><VerifiedUsersRoute><Lessons /></VerifiedUsersRoute></PrivateRoute>} />
            <Route path="/tools/:courseId/:moduleId/:unitId/:toolGroupId" element={<PrivateRoute><VerifiedUsersRoute><Tools /></VerifiedUsersRoute></PrivateRoute>} />
            <Route path="/practicals/:courseId/:moduleId/:unitId/:practicalGroupId" element={<PrivateRoute><VerifiedUsersRoute><Practicals /></VerifiedUsersRoute></PrivateRoute>} />
            <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
            <Route path="/register" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/verify-email-prompt" element={<VerifyEmailPrompt />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </div>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

function Layout({ children }) {
  const location = useLocation();

  // Paths that should not display the navbar and footer
  const hideNavbarAndFooter = ['/login', '/register', '/forgot-password', '/reset-password'];

  return (
    <>
      {!hideNavbarAndFooter.includes(location.pathname) && <Navbar />}
      {children}
      {!hideNavbarAndFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
