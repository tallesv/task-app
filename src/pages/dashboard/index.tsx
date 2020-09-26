import React from 'react';
import { useDispatch } from 'react-redux';
import localStorage from 'redux-persist/lib/storage';
import NavBar from '../../components/navBar';

const Dashboard: React.FC = () => {
  async function loadUsers() {
    const users = await localStorage.getItem('persist:root');
    if (users) {
      console.log(JSON.parse(JSON.parse(users).users));
    }
  }

  return (
    <>
      <NavBar />
      {/* loadUsers() */}
    </>
  );
};

export default Dashboard;
