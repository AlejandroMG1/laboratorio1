/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import BaseForm from 'components/BaseForm';
import { getEmpresaById, saveEmpresa } from 'servicios/empresa';
import { toast } from 'react-toastify';

const EmpresaForm = (props) => {
  const [enterpriseName, setEnterpriseName] = useState('');
  const [email, setEmail] = useState('');
  const [role] = useState('Cliente');
  const { empresaId, auth } = props;
  if (empresaId) {
    useEffect(async () => {
      const res = await getEmpresaById(empresaId, auth.id);
      setEnterpriseName(res.name);
    }, []);
  }

  const submitForm = async (evt) => {
    evt.preventDefault();
    const data = {
      enterprise: {
        name: enterpriseName,
      },
    };
    if (empresaId) {
      data.enterprise.id = empresaId;
    } else {
      data.user = {
        email,
        role,
      };
    }
    try {
      const res = await saveEmpresa(data, auth.id);

      toast.success(`
        empresa ${empresaId ? 'guardada' : `creada - ${res.empresa.name}`}`);
      if (!empresaId) {
        toast.success(`Empleado creado - ${res.empleado.email}`);
      }
    } catch {
      toast.error(
        'Error al crear empresa, verifique que los campos están correctos y que el usuario no exista'
      );
    }
  };

  return (
    <BaseForm
      title={`${empresaId ? 'Ver' : 'Crear'} empresa`}
      onSubmit={submitForm}
      titleSubmit={`${empresaId ? 'Editar' : 'Crear'} empresa`}
      showCancel={false}
    >
      <Input
        text='Nombre'
        name='enterpriseName'
        placeholder='Ingresa nombre de la empresa'
        type='text'
        value={enterpriseName}
        onChange={(e) => {
          setEnterpriseName(e.target.value);
        }}
      />

      {!empresaId && (
        <div className='w-full mt-4 items-start'>
          <div className='font-bold my-6'>Crear usuario</div>
          <Input
            text='Email'
            name='email'
            placeholder='Ingresa email del usuario'
            type='text'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Input text='Role' name='role' value={role} type='text' disabled />
        </div>
      )}
    </BaseForm>
  );
};

export default EmpresaForm;
