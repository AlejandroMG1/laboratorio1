import React from 'react';
import { Link } from 'react-router-dom';

const ItemProyecto = ({ proyecto }) => (
  <Link to={`DetallesProyecto/${proyecto.id}`}>
    <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2 hover:bg-[#d9e0ed] cursor-pointer'>
      <span className='text-center text-colorNegro'>{proyecto.name}</span>
      <span className='text-center text-colorNegro sticky left-[850px]'>
        {proyecto.clientEnterprise.name}
      </span>
      <div className='flex flex-row items-center relative pr-20 w-[450px] justify-between'>
        <span className='text-center text-colorNegro'>
          {proyecto.issues.length}
        </span>
        <span className='text-center text-colorNegro'>
          {proyecto.developers.length}
        </span>
        <span className='text-center text-colorNegro'>
          {proyecto.clients.length}
        </span>
      </div>
    </div>
  </Link>
);

export default ItemProyecto;
