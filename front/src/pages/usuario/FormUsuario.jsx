import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import BaseForm from 'components/BaseForm';
import { useNavigate } from 'react-router-dom';
import SelectForm from 'components/SelectForm';
import { crearUser } from 'servicios/usuer';
import { auth } from 'servicios/auth';
import { toast } from 'react-toastify';
import { getAllEmpresas } from 'servicios/empresa';
import Loading from 'components/Loading';

const FormUsuario = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [optionsEmpresa, setOptionsEmpresa] = useState([]);
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [optionsRole, setOptionsRole] = useState([]);
  const [role, setRole] = useState('');
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
      toast.error(
        'Error al crear el usuario verifique la información y que el usuario no exista'
      );
    }
  };

  useEffect(async () => {
    const res = await getAllEmpresas(auth.id);
    setOptionsEmpresa(
      res.map((empresaItem) => ({
        value: empresaItem.id,
        label: empresaItem.name,
      }))
    );

    setOptionsRole([
      {
        value: 'Desarrollador',
        label: 'Desarrollador',
      },
      {
        value: 'Cliente',
        label: 'Cliente',
      },
    ]);
    setLoading(false);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <BaseForm
      title='Nuevo usuario'
      onSubmit={submitForm}
      titleSubmit='Crear usuario'
      showCancel
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
          setEmail(e.target.value);
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
          setRole(e.value);
        }}
      />
    </BaseForm>
  );
};

export default FormUsuario;
