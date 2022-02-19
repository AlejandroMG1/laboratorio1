/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import ButtonForm from 'components/ButtonForm';

const CrearUsuario = () =>{
    const {form, updateFormData } = useFormData();

    const submitForm = (e) => {
        e.preventDefault();
    };


    return(
        <div className='flex flex-col p-10 items-center'>
            <h1 className='text-2xl font-bold text-gray-80 m-4'>
                Ingresa la información del usuario
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
                    text='Email'
                    name='email'
                    placeholder='Ingresa el email del usuario'
                    type='text'
                    />
                    <Input
                    text='Empresa'
                    name='empresa'
                    placeholder='Ingresa la empresa del usuario'
                    type='text'
                    />
                    <Input
                    text='Rol'
                    name='rol'
                    placeholder='Ingresa el rol del usuario'
                    type='text'
                    />
                </div>
                <ButtonForm text='Crear usuario'/>
                </form>
            </div>


        </div>
    );
}

export default CrearUsuario;