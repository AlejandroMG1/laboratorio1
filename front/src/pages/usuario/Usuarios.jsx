import React, { useEffect, useState } from 'react';
import ItemUsuario from 'components/ItemUsuario';
import CabeceraList from 'components/CabeceraList';
import { auth } from 'servicios/auth';
import { getAllUsers } from 'servicios/usuer';
import { Link } from 'react-router-dom';

const Usuarios = () => {
  const [users, setusers] = useState([]);

  useEffect(async () => {
    setusers(await getAllUsers(auth.id));
  }, []);

  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <CabeceraList title='Usuarios' placeholder='Usuario' />
      <div className='flex flex-col w-full gap-[2px] px-2 py-10'>
        <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between'>
          <span>Correo</span>
          <span className='fixed left-[800px]'>Empresa</span>
          <div className='flex flex-row justify-between items-center w-[450px] pr-20'>
            <span>Role</span>
          </div>
        </div>
        <Link to='/CrearUsuario'>
          <div className=' flex items-center rounded-md border-colorNegro border-2 w-full h-[50px] px-3 hover:bg-[#d9e0ed] cursor-pointer'>
            <span>Agregar User</span>
          </div>
        </Link>

        {users.map((user) => (
          <ItemUsuario usuario={user} />
        ))}
      </div>
    </div>
  );
};

export default Usuarios;
