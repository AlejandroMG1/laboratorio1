import React from 'react';
import Select from 'react-select';

const SelectForm = ({ options, onChange, title }) => (
  <div className='w-full'>
    <span className='block text-gray-700 text-lg font-bold mb-2 ml-6'>
      {title}
    </span>
    <Select
      className='block border border-grey-light w-full rounded mb-4'
      options={options}
      onChange={onChange}
    />
  </div>
);

export default SelectForm;
