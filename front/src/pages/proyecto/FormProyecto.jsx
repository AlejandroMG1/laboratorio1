/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import ButtonForm from 'components/ButtonForm';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAllEmpresas } from 'servicios/empresa';
import { crearProyecto } from 'servicios/proyecto';

const FormProyecto = () => {
  const navigate = useNavigate();
  const [optionsEmpresa, setoptionsEmpresa] = useState([]);
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [descripción, setDescripción] = useState('');

  useEffect(() => {
    //setoptionsEmpresa(getAllEmpresas());
    setoptionsEmpresa([
      { value: 'ckzhjabhl0047acrnwr5ila83', label: 'Empresa1' },
      { value: '2', label: 'Empresa2' },
      { value: '3', label: 'Empresa3' },
      { value: '4', label: 'Empresa4' },
    ]);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const res = crearProyecto({ nombre, empresa, descripción });
      toast.success('Proyecto creado');
      navigate('/Proyectos');
    } catch {
      toast.error('Error');
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col mt-20 items-center justify-center rounded-xl border-colorNegro border-2 w-[800px] bg-[#F2F4F7]'>
        <h1 className='text-4xl font-bold text-gray-800 my-10  font-sans'>
          Nuevo Proyecto
        </h1>

        <form
          onSubmit={onSubmit}
          className='flex flex-col items-center px-10 w-full pb-10'
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
          <div className='w-full'>
            <span className='block text-gray-700 text-lg font-bold mb-2 ml-6'>
              Empresa
            </span>
            <Select
              className='block border border-grey-light w-full rounded mb-4'
              options={optionsEmpresa}
              onChange={(e) => {
                setEmpresa(e.value);
              }}
            />
          </div>

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
          <ButtonForm text='Crear proyecto' />
        </form>
      </div>
    </div>
  );
};

export default FormProyecto;
