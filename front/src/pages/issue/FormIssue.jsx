/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BaseForm from 'components/BaseForm';
import Input from 'components/Input';
import { useNavigate } from 'react-router-dom';
import SelectForm from 'components/SelectForm';

const FormIssue = () => {
  const navigate = useNavigate();
  const [optionsProyectos, setoptionsProyectos] = useState([]);
  const [proyecto, setproyecto] = useState('');
  const [optionsDevelopers, setoptionsDevelopers] = useState([]);
  const [developer, setdeveloper] = useState('');
  const [optionsCategoria, setoptionsCategoria] = useState([]);
  const [Categoria, setCategoria] = useState('');
  const [optionsPrioridad, setoptionsPrioridad] = useState([]);
  const [prioridad, setprioridad] = useState('');
  const [optionsStatus, setoptionsStatus] = useState([]);
  const [status, setstatus] = useState('');
  const [hourEstimate, sethourEstimate] = useState(0);
  const [dueDate, setdueDate] = useState('');
  const [closeDate, setcloseDate] = useState('');
  const [descripción, setDescripción] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <BaseForm
      title='Nuevo issue'
      onSubmit={submitForm}
      titleSubmit='Crear issue'
      onCancelar={() => {
        navigate('/issues');
      }}
    >
      <SelectForm
        title='Proyecto'
        options={optionsProyectos}
        onChange={(e) => {
          setproyecto(e.value);
        }}
      />

      <SelectForm
        title='Desarrollador'
        options={optionsDevelopers}
        onChange={(e) => {
          setdeveloper(e.value);
        }}
      />

      <SelectForm
        title='Categoria'
        options={optionsCategoria}
        onChange={(e) => {
          setCategoria(e.value);
        }}
      />

      <SelectForm
        title='Prioridad'
        options={optionsPrioridad}
        onChange={(e) => {
          setprioridad(e.value);
        }}
      />

      <SelectForm
        title='Status'
        options={optionsStatus}
        onChange={(e) => {
          setstatus(e.value);
        }}
      />

      <Input
        text='Horas estimadas'
        name='hourEstimate'
        placeholder='Ingresa horas estimadas'
        type='number'
        value={hourEstimate}
        onChange={(e) => {
          sethourEstimate(e.target.value);
        }}
      />
      <Input
        text='Fecha de vencimiento'
        name='dueDate'
        placeholder='Ingresa fecha de vencimiento'
        type='Date'
        value={dueDate}
        onChange={(e) => {
          setdueDate(e.target.value);
        }}
      />
      <Input
        text='Fecha de cierre'
        name='closeDate'
        placeholder='Ingresa fecha de cierre'
        type='Date'
        value={closeDate}
        onChange={(e) => {
          setcloseDate(e.target.value);
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

export default FormIssue;
