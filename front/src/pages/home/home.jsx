import React from 'react';
import logo from 'assets/2.svg';

const home = () => (
  <div className='flex flex-col pt-52 gap-6 w-full items-center'>
    <img
      className='h-[300px] w-[300px] stroke-colorBlanco'
      src={logo}
      alt='logo Bit software'
    />
    <span className='text-colorNegro text-9xl'>Bit software</span>
  </div>
);

export default home;
