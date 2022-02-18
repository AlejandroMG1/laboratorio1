/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const ButtonForm = ({ text }) => (
  <button
    className='text-colorBlanco w-full text-xl bg-colorNegro focus:ring-4 focus:ring-gray-300 font-medium rounded-full  p-3 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700'
    type='submit'
  >
    {text}
  </button>
);

export default ButtonForm;
