import React, { useEffect, useState } from 'react';
import ItemUsuario from 'components/ItemUsuario';
import CabeceraList from 'components/CabeceraList';
import { auth } from 'servicios/auth';
import Dialog from '@mui/material/Dialog';
import {
  getAllUsers,
  getAllDevelopers,
  getAllClientesbyEmpresa,
} from 'servicios/usuer';
import { useNavigate } from 'react-router-dom';
import SelectForm from 'components/SelectForm';
import ButtonForm from 'components/ButtonForm';
import { addProjectUser } from 'servicios/proyecto';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';

const Usuarios = ({ id, opt }) => {
  const [users, setusers] = useState([]);
  const [optionUser, setOptionUser] = useState([]);
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState('');
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDialog, setLoadingDialog] = useState(true);
  const navigate = useNavigate();
  useEffect(async () => {
    getUsers();
  }, [opt]);

  const onClickAgregar = async () => {
    let res;
    switch (opt) {
      case 1:
        setDialog(true);
        res = await getAllClientesbyEmpresa(id, auth.id);
        filtrarUser(res);
        setLoadingDialog(false);
        break;
      case 2:
        setDialog(true);
        res = await getAllDevelopers(auth.id);
        filtrarUser(res);
        setLoadingDialog(false);
        break;
      default:
        navigate('/CrearUsuario');
    }
  };

  const filtrarUser = async (res) => {
    const resFilter = res.filter(
      (item) => users.findIndex((item2) => item2.email === item.email) === -1
    );

    setOptionUser(
      resFilter.map((clientesItem) => ({
        value: clientesItem.id,
        label: clientesItem.email,
      }))
    );
  };
  const getUsers = async () => {
    setLoading(true);
    if (opt !== 'Desarrolladores') {
      setusers(await getAllUsers(auth.id));
    }
    switch (opt) {
      case 1:
        setTitle('Clientes');
        break;
      case 2:
        setTitle('Desarrolladores');
        break;
      default:
        setTitle('Usuarios');
    }
    setLoading(false);
  };

  const agregarUser = async () => {
    try {
      setDialog(false);
      setLoading(true);
      await addProjectUser(id, user, auth.id);
      toast.success('Usuario Añadido');
      getUsers();
    } catch {
      toast.error('Error');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <CabeceraList title={title} />
      <div className='flex flex-col w-full gap-[2px] px-2 py-10'>
        <div className=' grid grid-cols-3 items-center w-full h-[50px] px-3 justify-between'>
          <span>Correo</span>
          <span>Empresa</span>
          <span>Rol</span>
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

      <Dialog
        open={dialog}
        onClose={() => {
          setLoadingDialog(true);
          setDialog(false);
        }}
      >
        <div className='div div-col w-[500px] p-14 overflow-visible'>
          {loadingDialog ? (
            <Loading />
          ) : (
            <>
              <SelectForm
                title={title}
                options={optionUser}
                onChange={(e) => {
                  setUser(e.value);
                }}
              />
              <ButtonForm text='Agregar' submit={false} onclick={agregarUser} />
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Usuarios;
