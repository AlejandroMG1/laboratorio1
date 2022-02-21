import React from 'react';

const Input = ({
  text,
  name,
  placeholder,
  type,
  value,
  onChange,
  disabled,
  defaultValue = null,
}) => (
  <div className='w-full'>
    <span className='block text-gray-700 text-lg font-bold mb-2 ml-6'>
      {text}
    </span>
    <input
      className='block border border-grey-light w-full p-3 rounded mb-4 disabled:bg-colorNegro disabled:text-colorBlanco'
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  </div>
);

export default Input;
