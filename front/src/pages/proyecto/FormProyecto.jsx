import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAllEmpresas } from 'servicios/empresa';
import { crearProyecto } from 'servicios/proyecto';
import { auth } from 'servicios/auth';
import BaseForm from 'components/BaseForm';
import SelectForm from 'components/SelectForm';

const FormProyecto = () => {
  const navigate = useNavigate();
  const [optionsEmpresa, setoptionsEmpresa] = useState([]);
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [descripción, setDescripción] = useState('');

  useEffect(async () => {
    const res = await getAllEmpresas(auth.id);
    setoptionsEmpresa(
      res.map((empresaItem) => ({
        value: empresaItem.id,
        label: empresaItem.name,
      }))
    );
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearProyecto({ nombre, empresa, descripción }, auth.id);
      toast.success('Proyecto creado');
      navigate('/Proyectos');
    } catch {
      toast.error('Error');
    }
  };

  return (
    <BaseForm
      title='Nuevo Proyecto'
      onSubmit={onSubmit}
      titleSubmit='Crear proyecto'
      onCancelar={() => {
        navigate('/Proyectos');
      }}
    >
      <Input
        text='Nombre'
        name='nombre'
        placeholder='Ingresa nombre de la empresa'
        type='text'
        value={nombre}
        onChange={(e) => {
          setNombre(e.target.value);
        }}
      />

      <SelectForm
        title='Empresa'
        options={optionsEmpresa}
        onChange={(e) => {
          setEmpresa(e.value);
        }}
      />

      <div className='w-full'>
        <span className='block text-gray-700 text-lg font-bold mb-2 ml-6'>
          Descripción
        </span>
        <textarea
          className='block border border-grey-light w-full p-3 rounded mb-4'
          name='Descripción'
          rows='10'
          placeholder='Descripción'
          value={descripción}
          onChange={(e) => {
            setDescripción(e.target.value);
          }}
        />
      </div>
    </BaseForm>
  );
};

export default FormProyecto;
