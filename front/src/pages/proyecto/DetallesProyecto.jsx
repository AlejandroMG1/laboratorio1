import Issues from 'pages/issue/Issues';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getbyidProyecto } from 'servicios/proyecto';

const DetallesProyecto = () => {
  const { id } = useParams();
  let proyecto;
  useEffect(() => {
    proyecto = getbyidProyecto(id);
  }, []);

  return (
    <div className='flex flex-col w-full items-center'>
      <h1 className='text-4xl font-bold my-10  font-sans'>{proyecto.nombre}</h1>
      <div className='flex flex-col justify-center gap-6 mx-96'>
        <span className='text-lg text-center'>{proyecto.empresa}</span>
        <p className='block p-3 text-lg rounded mb-4 '>
          {proyecto.descripción}
        </p>
      </div>
      <Issues opt={1} id={id} />
    </div>
  );
};

export default DetallesProyecto;
