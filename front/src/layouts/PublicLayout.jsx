import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from 'components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

const PublicLayout = (props) => {
  const navigate = useNavigate();
  const { Logout, user } = props;

  const LogoutPublic = () => {
    navigate('/');
    Logout();
  };

  return (
    <div className='flex flex-col'>
      <Navbar user={user} Logout={LogoutPublic} />
      <div className='h-full'>
        <Outlet />
        <ToastContainer autoClose={false} />
      </div>
    </div>
  );
};

export default PublicLayout;
