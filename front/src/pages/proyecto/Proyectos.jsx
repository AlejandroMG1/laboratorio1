/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import ItemProyecto from 'components/ItemProyecto';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  const getAllProductos = async () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:4000/proyectos',
      headers: { 'Content-type': 'application/json' },
    };

    const respuesta = await axios.request(options);
    setProyectos(respuesta.data.proyectos);
  };

  useEffect(() => {
    //getAllProductos();
    setProyectos([
      {
        id: 1,
        name: 'app',
        empresa: 'bit',
        issues: 4,
        develop: 10,
        clientes: 30,
        descripcion:
          'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
      },
    ]);
  }, []);

  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <div className='flex justify-between w-full items-center'>
        <span className='block text-2xl font-bold'>Proyectos</span>
        <div className='flex flex-row items-center gap-4'>
          <label
            className='block text-gray-700 text-xl font-bold'
            htmlFor='buscar'
          >
            Buscar
          </label>

          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='Buscar'
            type='search'
            placeholder='Proyecto'
          />
        </div>
      </div>
      <div className='flex flex-col w-full gap-[2px] px-2 py-10'>
        <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between'>
          <span>Nombre de proyecto</span>
          <span className='fixed left-[800px]'>Empresa</span>
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
