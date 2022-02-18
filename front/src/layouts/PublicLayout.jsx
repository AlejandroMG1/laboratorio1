/* eslint-disable no-restricted-imports */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

const PublicLayout = () => (
  <div className='w-full flex flex-col'>
    <Navbar />
    <div className='h-full'>
      <Outlet />
      <ToastContainer />
    </div>
  </div>
);

export default PublicLayout;
