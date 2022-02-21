import React from 'react';
import Select from 'react-select';

const SelectForm = ({
  options,
  onChange,
  title,
  disable = false,
  defaultValue = null,
}) => (
  <div className='w-full'>
    <span className='block text-gray-700 text-lg font-bold mb-2 ml-6'>
      {title}
    </span>
    <Select
      className='block border border-grey-light w-full rounded mb-4'
      options={options}
      onChange={onChange}
      isDisabled={disable}
      defaultValue={defaultValue}
    />
  </div>
);

export default SelectForm;
