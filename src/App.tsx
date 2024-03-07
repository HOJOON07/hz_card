import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Test from './pages/Test';
import HomePage from './pages/Home';
import CardPage from './pages/Card';
import ScrollToTop from './components/shared/ScrollToTop';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signup';
import Navbar from './components/shared/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import ApplyPage from './pages/Apply';
import ApplyDone from './pages/ApplyDone';
import { Suspense } from 'react';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/test" Component={Test} />
          <Route path="/card/:id" Component={CardPage} />
          <Route path="/signin" Component={SigninPage} />
          <Route
            path="/apply/:id"
            element={
              <PrivateRoute>
                <Suspense fallback={<></>}>
                  <ApplyPage />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/apply/done"
            element={
              <PrivateRoute>
                <ApplyDone />
              </PrivateRoute>
            }
          />
          <Route path="/signup" Component={SignupPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
