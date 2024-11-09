import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolistindex from './todolistcomponet/Todolistindex';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './Logincomponet/pages/RegisterPage';
import MyLoginPage from './Logincomponet/pages/LoginPage';
import DashboardPage from './Logincomponet/pages/DashboardPage';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todolistindex />} />
        <Route path="/login" element={<MyLoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;

