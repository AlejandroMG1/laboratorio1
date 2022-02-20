/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ItemUsuario from 'components/ItemUsuario';
import CabeceraList from 'components/CabeceraList';
import { auth } from 'servicios/auth';
import Dialog from '@mui/material/Dialog';
import {
  getAllUsers,
  getAllClientesbyProyect,
  getAllDevelopersbyProyect,
} from 'servicios/usuer';
import { Link, useNavigate } from 'react-router-dom';
import SelectForm from 'components/SelectForm';
import ButtonForm from 'components/ButtonForm';

const Usuarios = ({ opt, id }) => {
  const [users, setusers] = useState([]);
  const [optionUser, setOptionUser] = useState([]);
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState('');
  const [dialog, setDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(async () => {
    switch (opt) {
      case 1:
        setusers(await getAllClientesbyProyect(auth.id, id));
        setTitle('Usuarios');
        break;
      case 2:
        setusers(await getAllDevelopersbyProyect(auth.id, id));
        setTitle('Desarrolladores');
        break;
      default:
        setusers(await getAllUsers(auth.id));
        setTitle('Clientes');
    }
  }, [opt]);

  const onClickAgregar = () => {
    if (opt === 1) {
      setDialog(true);
    } else {
      navigate('/CrearUsuario');
    }
  };

  const agregarUser = () => {};

  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <CabeceraList title={title} placeholder='Usuario' />
      <div className='flex flex-col w-full gap-[2px] px-2 py-10'>
        <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between'>
          <span>Correo</span>
          <span className='relative pr-[50px]'>Empresa</span>
          <div className='flex flex-row justify-between items-center w-[450px] pr-20'>
            <span>Role</span>
          </div>
        </div>
        <button type='button' onClick={onClickAgregar}>
          <div className=' flex items-center rounded-md border-colorNegro border-2 w-full h-[50px] px-3 hover:bg-[#d9e0ed] cursor-pointer'>
            <span>Agregar User</span>
          </div>
        </button>

        {users.map((userItem) => (
          <ItemUsuario usuario={userItem} />
        ))}
      </div>
      <Dialog open={dialog}>
        <SelectForm
          title={title}
          options={optionUser}
          onChange={(e) => {
            setUser(e.value);
          }}
        />
        <ButtonForm text='Agregar' submit={false} onclick={agregarUser} />
      </Dialog>
    </div>
  );
};

export default Usuarios;
