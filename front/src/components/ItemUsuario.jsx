import React from 'react';

const ItemUsuario = ({ usuario }) => (
  <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2'>
    <span className='text-center text-colorNegro'>{usuario.email}</span>
    <span className='text-center text-colorNegro relative pr-[50px]'>
      {usuario.enterprise ? usuario.enterprise.name : 'No asignado'}
    </span>
    <div className='flex flex-row items-center relative pr-20 w-[450px] justify-between'>
      <span className='text-center text-colorNegro'>{usuario.role}</span>
    </div>
  </div>
);

export default ItemUsuario;
