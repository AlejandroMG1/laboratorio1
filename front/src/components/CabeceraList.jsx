import React from 'react';

const CabeceraList = ({ title, placeholder }) => (
  <div className='flex justify-between w-full items-center'>
    <span className='block text-2xl font-bold'>{title}</span>
    <div className='flex flex-row items-center gap-4'>
      <span className='block text-gray-700 text-xl font-bold'>Buscar</span>

      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        name='Buscar'
        type='search'
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default CabeceraList;
