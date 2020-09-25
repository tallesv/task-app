import React from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../../components/navBar';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <NavBar />
    </>
  );
};

export default Dashboard;
