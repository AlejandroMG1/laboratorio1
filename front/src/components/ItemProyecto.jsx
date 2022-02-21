import React from 'react';
import { Link } from 'react-router-dom';

const ItemProyecto = ({ proyecto }) => (
  <Link to={`DetallesProyecto/${proyecto.id}`}>
    <div className=' grid grid-cols-7 items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2 hover:bg-[#d9e0ed] cursor-pointer'>
      <span className='col-span-2 text-colorNegro'>{proyecto.name}</span>
      <span className='col-span-2 text-colorNegro '>
        {proyecto.clientEnterprise.name}
      </span>
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
  </Link>
);

export default ItemProyecto;
