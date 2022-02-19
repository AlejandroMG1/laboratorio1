import React, { useState, useEffect } from 'react';
import ItemProyecto from 'components/ItemProyecto';
import { Link } from 'react-router-dom';
import { getAllProyectos } from 'servicios/proyecto';
import CabeceraList from 'components/CabeceraList';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(async () => {
    setProyectos(await getAllProyectos());
  }, []);

  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <CabeceraList title='Proyectos' placeholder='proyecto' />
      <div className='flex flex-col w-full gap-[2px] px-2 py-10'>
        <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between'>
          <span>Nombre de proyecto</span>
          <span className='left-[800px]'>Empresa</span>
          <div className='flex flex-row justify-between items-center w-[450px] pr-20'>
            <span>Issues</span>
            <span>Develop</span>
            <span>Clientes</span>
          </div>
        </div>
        <Link to='/crearProyecto'>
          <div className=' flex items-center rounded-md border-colorNegro border-2 w-full h-[50px] px-3 hover:bg-[#d9e0ed] cursor-pointer'>
            <span>Adregar Proyecto</span>
          </div>
        </Link>

        {proyectos.map((proyecto) => (
          <ItemProyecto proyecto={proyecto} />
        ))}
      </div>
    </div>
  );
};

export default Proyectos;
