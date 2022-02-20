import NavDetalleProyecto from 'components/NavDetalleProyecto';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from 'servicios/auth';
import { getbyidProyecto } from 'servicios/proyecto';

const DetallesProyecto = () => {
  const { id } = useParams();
  const [proyecto, getProyecto] = useState({});
  useEffect(async () => {
    getProyecto(await getbyidProyecto(id, auth.id));
  }, []);

  return (
    <div className='flex flex-col w-full items-center'>
      <h1 className='text-4xl font-bold my-10  font-sans'>{proyecto.name}</h1>
      <div className='flex flex-col justify-center gap-6 mx-96'>
        <span className='text-lg text-center'>
          {proyecto.clientEnterpriseId}
        </span>
        <p className='block p-3 text-lg rounded mb-4 '>
          {proyecto.description}
        </p>
      </div>
      <NavDetalleProyecto id={id} />
    </div>
  );
};

export default DetallesProyecto;
