/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Link } from 'react-router-dom';

const ItemProyecto = ({ proyecto }) => (
  <Link to={`DetallesProyecto/${proyecto.id}`}>
    <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2 hover:bg-[#d9e0ed] cursor-pointer'>
      <span className='text-center text-colorNegro'>{proyecto.name}</span>
      <span className='text-center text-colorNegro fixed left-[800px]'>
        {proyecto.empresa}
      </span>
      <div className='flex flex-row items-center relative pr-20 w-[450px] justify-between'>
        <span className='text-center text-colorNegro'>{proyecto.issues}</span>
        <span className='text-center text-colorNegro'>{proyecto.develop}</span>
        <span className='text-center text-colorNegro'>{proyecto.clientes}</span>
      </div>
    </div>
  </Link>
);

export default ItemProyecto;
