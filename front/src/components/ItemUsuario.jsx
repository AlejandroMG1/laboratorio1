import React from 'react';

const ItemUsuario = ({ usuario }) => (
  <div className=' grid grid-cols-3 items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2'>
    <span className='text-colorNegro'>{usuario.email}</span>
    <span className='text-colorNegro'>
      {usuario.enterprise ? usuario.enterprise.name : 'No asignado'}
    </span>
    <span className='text-colorNegro'>{usuario.role}</span>
  </div>
);

export default ItemUsuario;
