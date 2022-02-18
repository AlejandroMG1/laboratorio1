/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import ButtonForm from 'components/ButtonForm';
import Select from 'react-select'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const FormProyecto = ({crearForm}) => {
  const navigate=useNavigate();
  const [optionsEmpresa, setoptionsEmpresa] = useState([]);
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [descripción, setDescripción] = useState('');


  useEffect(() => {
   
    setoptionsEmpresa([
      { value: '1', label: 'Empresa1' },
      { value: '2', label: 'Empresa2' },
      { value: '3', label: 'Empresa3' },
      { value: '4', label: 'Empresa4' },
    ]);
  }, []);

  const getAllEmpresas = async () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:4000/Empresas',
      headers: { 'Content-type': 'application/json' },
    };

    const respuesta = await axios.request(options);
    setoptionsEmpresa(respuesta.data.Empresas);
  };

  const crearProyecto = async (e) => {
    e.preventDefault();
    
    const options = {
      method: 'POST',
      url: 'http://localhost:4000/project',
      headers: { 'Content-type': 'application/json' },
      data: {
        name: nombre,
        clientEnterpriseId: empresa,
        description: descripción

      }
    };

    try{
      //await axios.request(options);
      toast.success('Proyecto creado')
      navigate('/Proyectos') 
    } catch{
      toast.error('Error')
    }

  };

  


  const modificarProyecto = async(e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      url: 'http://localhost:4000/project',
      headers: { 'Content-type': 'application/json' },
      data: {
        name: nombre,
        clientEnterpriseId: empresa,
        description: descripción

      }
    };
    await axios.request(options);
  };

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col mt-20 items-center justify-center rounded-xl border-colorNegro border-2 w-[800px] bg-[#F2F4F7]'>
        <h1 className='text-4xl font-bold text-gray-800 my-10  font-sans'>
          Nuevo Proyecto
        </h1>

        <form
          onSubmit={crearProyecto}
          className='flex flex-col items-center px-10 w-full pb-10'
        >

          <Input
            text='Nombre'
            name='nombre'
            placeholder='Ingresa nombre de la empresa'
            type='text'
            value={nombre}
            onChange={e => { setNombre(e.target.value) }}
          />
          <div className='w-full'>
            <label
              className='block text-gray-700 text-lg font-bold mb-2 ml-6'
              htmlFor='Empresa'
            >
              Empresa
            </label>
            <Select className='block border border-grey-light w-full rounded mb-4' options={optionsEmpresa} onChange={e => { setEmpresa(e.value) }} />

          </div>

          <div className='w-full'>

            <label
              className='block text-gray-700 text-lg font-bold mb-2 ml-6'
              htmlFor='Descripción'
            >
              Descripción
            </label>
            <textarea className='block border border-grey-light w-full p-3 rounded mb-4'
              name="Descripción" rows="10" placeholder='Descripción' value={descripción} onChange={(e) => { setDescripción(e.target.value) }}></textarea>

          </div>
          <ButtonForm text='Crear proyecto' />
        </form>
      </div>

    </div>

  );
};

export default FormProyecto;