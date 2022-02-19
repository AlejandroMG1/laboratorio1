/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import ButtonForm from 'components/ButtonForm';

const CrearIssue = () =>{
    const {form, updateFormData } = useFormData();

    const submitForm = (e) => {
        e.preventDefault();
    };


    return(
        <div className='flex flex-col p-10 items-center'>
            <h1 className='text-2xl font-bold text-gray-80 m-4'>
                Ingresa la información del issue
            </h1>
            <div className='flex flex-col'>
                <form
                    ref={form}
                    onChange={updateFormData}
                    onSubmit={submitForm}
                    className='flex flex-col gap-y-10 items-center'
                >
                <div className='flex flex-col m-8'>
                    <Input
                    text='Descripción'
                    name='descripcion'
                    placeholder='Ingresa la descripcion del issue'
                    type='text'
                    />
                    <Input
                    text='Categoría'
                    name='categoria'
                    placeholder='Ingresa la categoria del issue'
                    type='text'
                    />
                    <Input
                    text='Prioridad'
                    name='prioridad'
                    placeholder='Ingresa la prioridad del issue'
                    type='text'
                    />
                    <Input
                    text='Estado'
                    name='estado'
                    placeholder='Ingresa el estado del issue'
                    type='text'
                    />
                    <Input
                    text='Hora estimada'
                    name='hora-estimada'
                    placeholder='Ingresa la hora estimada del issue'
                    type='text'
                    />
                    <Input
                    text='Desarrollador'
                    name='desarrollador'
                    placeholder='Ingresa el desarrollador del issue'
                    type='text'
                    />
                    <Input
                    text='Fecha de vencimiento'
                    name='vencimiento'
                    placeholder='Ingresa la fecha de vencimiento del issue'
                    type='text'
                    />
                    <Input
                    text='Fecha de cierre'
                    name='cierre'
                    placeholder='Ingresa la fecha de cierre del issue'
                    type='text'
                    />
                    <Input
                    text='Proyecto'
                    name='proyecto'
                    placeholder='Ingresa el proyecto del issue'
                    type='text'
                    />
                    <Input
                    text='Comentarios'
                    name='comentario'
                    placeholder='Ingresa los comentarios del issue'
                    type='text'
                    />
                </div>
                <ButtonForm text='Crear issue'/>
                </form>
            </div>


        </div>
    );
}

export default CrearIssue;