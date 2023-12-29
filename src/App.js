// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Admin/Dashboard/Dashboard';
import CreateDoctor from './component/Admin/Create Doctor/CreateDoctor';
import Login from './component/Admin/Login/Login.jsx';
import Doctors from './component/Admin/Doctors/Doctors';
import UpdateDoctor from './component/Admin/Doctors/UpdateDoctor.jsx';
import Users from './component/Admin/Users/Users';
import Home from "./component/Home/Home.jsx";
import ConnUsers from './component/Admin/Users/ConnUsers.jsx';
import Reviews from './component/Admin/Reviews/Reviews';
import toast, { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from 'protected-route-react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction.js';

function App() {
  const { isAuthenticated, message, error } = useSelector(state => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/dashboard"
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createdoctors"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CreateDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connected"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ConnUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Reviews />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
