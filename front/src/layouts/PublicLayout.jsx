import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from 'components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

const PublicLayout = (props) => {
  const { Logout, user } = props;
  return (
    <div className='flex flex-col'>
      <Navbar user={user} Logout={Logout} />
      <div className='h-full'>
        <Outlet />
        <ToastContainer autoClose={false} />
      </div>
    </div>
  );
};

export default PublicLayout;
