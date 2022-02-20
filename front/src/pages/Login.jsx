/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-imports */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import logo from 'assets/2.svg';

const LoginForm = ({ Login, error }) => {
  const { form, updateFormData } = useFormData();

  const submitForm = (e) => {
    e.preventDefault();
    Login(form.current[0].value);
  };

  return (
    <div className='flex flex-col p-10 items-center'>
      <img className='h-40 w-40' src={logo} />
      <span className='text-5xl my-10'>Bit software</span>
      <h1 className='text-2xl font-bold text-gray-800 my-4'>Login</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col gap-y-10 items-center'
      >
        <div className='flex flex-col'>
          <Input
            text=''
            name='Correo'
            placeholder='Ingresa el correo'
            type='email'
          />
          <div>
            <span>{error}</span>
          </div>
        </div>
        <button
          className='button-submit border-2 p-1 border-colorNegro rounded'
          type='submit'
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
