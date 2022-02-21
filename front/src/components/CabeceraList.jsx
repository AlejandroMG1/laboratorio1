import React from 'react';

const CabeceraList = ({ title }) => (
  <div className='flex justify-between w-full items-center'>
    <span className='block text-2xl font-bold'>{title}</span>
  </div>
);

export default CabeceraList;
