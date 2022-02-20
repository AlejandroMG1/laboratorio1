import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import BaseForm from 'components/BaseForm';
import { useNavigate } from 'react-router-dom';
import SelectForm from 'components/SelectForm';
import { crearUser } from 'servicios/usuer';
import { auth } from 'servicios/auth';
import { toast } from 'react-toastify';
import { getAllEmpresas } from 'servicios/empresa';

const FormUsuario = () => {
  const navigate = useNavigate();
  const [optionsEmpresa, setoptionsEmpresa] = useState([]);
  const [empresa, setEmpresa] = useState('');
  const [email, setemail] = useState('');
  const [optionsRole, setoptionsRole] = useState([]);
  const [role, setrole] = useState('');
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await crearUser(
        {
          email,
          role,
          empresa,
        },
        auth.id
      );
      toast.success('User creado');
      navigate('/Usuarios');
    } catch {
      toast.error('Error');
    }
  };

  useEffect(async () => {
    const res = await getAllEmpresas(auth.id);
    setoptionsEmpresa(
      res.map((empresaItem) => ({
        value: empresaItem.id,
        label: empresaItem.name,
      }))
    );

    setoptionsRole([
      {
        value: 'Desarrollador',
        label: 'Desarrollador',
      },
      {
        value: 'Cliente',
        label: 'Cliente',
      },
    ]);
  }, []);

  return (
    <BaseForm
      title='Nuevo usuario'
      onSubmit={submitForm}
      titleSubmit='Crear usuario'
      onCancelar={() => {
        navigate('/Usuarios');
      }}
    >
      <Input
        text='Correo'
        name='email'
        placeholder='Ingrese su correo'
        type='email'
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />

      <SelectForm
        title='Empresa'
        options={optionsEmpresa}
        onChange={(e) => {
          setEmpresa(e.value);
        }}
      />
      <SelectForm
        title='Rol'
        options={optionsRole}
        onChange={(e) => {
          setrole(e.value);
        }}
      />
    </BaseForm>
  );
};

export default FormUsuario;
