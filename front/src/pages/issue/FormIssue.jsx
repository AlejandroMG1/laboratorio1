/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
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
    const [empresa, setEmpresa] = useState('');
    const [descripción, setDescripción] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
    };

    return (

        <BaseForm title='Nuevo issue' onSubmit={submitForm} titleSubmit='Crear issue'>


            <SelectForm
                options={optionsProyectos}
                onChange={(e) => {
                    setproyecto(e.value);
                }}
            />

            <SelectForm
                options={optionsDevelopers}
                onChange={(e) => {
                    setdeveloper(e.value);
                }}
            />

            <SelectForm
                options={optionsDevelopers}
                onChange={(e) => {
                    setdeveloper(e.value);
                }}
            />

            <SelectForm
                options={optionsDevelopers}
                onChange={(e) => {
                    setdeveloper(e.value);
                }}
            />

            <SelectForm
                options={optionsDevelopers}
                onChange={(e) => {
                    setdeveloper(e.value);
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
}

export default FormIssue;