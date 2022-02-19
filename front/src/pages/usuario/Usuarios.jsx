/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import ItemUsuario from 'components/ItemUsuario';

const Usuarios = () => (
  <div className='flex flex-col pt-8 px-16  w-full'>
    <div className='flex justify-between w-full items-center'>
      <span className='block text-2xl font-bold'>User</span>
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
          placeholder='correo'
        />
      </div>
    </div>
    <div className='flex flex-col w-full gap-[2px] px-2 py-10'>
      <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between'>
        <span>Correo</span>
        <span className='fixed left-[800px]'>Empresa</span>
        <div className='flex flex-row justify-between items-center w-[450px] pr-20'>
          <span>Role</span>
        </div>
      </div>
      <div className=' flex items-center rounded-md border-colorNegro border-2 w-full h-[50px] px-3'>
        <span>Agregar Usuario</span>
      </div>
      <ItemUsuario
        usuario={{
          email: 'app',
          empresa: 'bit',
          role: 'Deserrallodaor',
        }}
      />
    </div>
  </div>
);

export default Usuarios;
