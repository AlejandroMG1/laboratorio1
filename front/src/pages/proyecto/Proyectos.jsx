import React, { useState, useEffect } from 'react';
import ItemProyecto from 'components/ItemProyecto';
import { Link } from 'react-router-dom';
import { getAllProyectos } from 'servicios/proyecto';
import CabeceraList from 'components/CabeceraList';
import { auth } from 'servicios/auth';
import Loading from 'components/Loading';

const Proyectos = () => {
  const [loading, setLoading] = useState(true);
  const [proyectos, setProyectos] = useState([]);

  useEffect(async () => {
    setProyectos(await getAllProyectos(auth.id));
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <CabeceraList title='Proyectos' />
      <div className='flex flex-col w-full gap-[2px] px-2 py-10'>
        <div className=' grid grid-cols-7 items-center w-full h-[50px] px-3 justify-between'>
          <span className='col-span-2'>Nombre de proyecto</span>
          <span className='col-span-2'>Empresa</span>
          <span className='text-center'>Issues</span>
          <span className='text-center'>Desarrolladores</span>
          <span className='text-center'>Clientes</span>
        </div>
        <Link to='/crearProyecto'>
          <div className=' flex items-center rounded-md border-colorNegro border-2 w-full h-[50px] px-3 hover:bg-[#d9e0ed] cursor-pointer'>
            <span>Agregar Proyecto</span>
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
