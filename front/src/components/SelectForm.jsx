import React from 'react';
import Select from 'react-select';

const SelectForm = ({ options, onChange }) => (
  <Select
    className='block border border-grey-light w-full rounded mb-4'
    options={options}
    onChange={onChange}
  />
);

export default SelectForm;
