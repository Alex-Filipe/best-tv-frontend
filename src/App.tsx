import React from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Home from './Pages/Home/Home';
import ProtectedRoute from './Routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
