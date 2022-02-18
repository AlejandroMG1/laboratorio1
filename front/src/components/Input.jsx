/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const Input = ({ text, name, placeholder, type, value, onChange }) => (
  <div className='w-full'>
    <label
      className='block text-gray-700 text-lg font-bold mb-2 ml-6'
      htmlFor={name}
    >
      {text}
    </label>
    <input
      className='block border border-grey-light w-full p-3 rounded mb-4'
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Input;
