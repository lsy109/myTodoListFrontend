// /src/pages/DashboardPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../component/Dashboard';
const DashboardPage: React.FC = () => {
  const location = useLocation();
  const { userData } = location.state || {}; // 解构出 userdata
  return (
    <div className='myDashboard'>
      
      <Dashboard username = {userData?.username} email = {userData?.email}/>
      
    </div>
  );
};

export default DashboardPage;
