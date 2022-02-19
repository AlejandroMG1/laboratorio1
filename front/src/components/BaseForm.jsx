import React from 'react';
import ButtonForm from 'components/ButtonForm';

const BaseForm = ({ title, onSubmit, titleSubmit, children }) => (
  <div className='flex justify-center'>
    <div className='flex flex-col mt-20 items-center justify-center rounded-xl border-colorNegro border-2 w-[800px] bg-[#F2F4F7]'>
      <h1 className='text-4xl font-bold text-gray-800 my-10  font-sans'>
        {title}
      </h1>

      <form
        onSubmit={onSubmit}
        className='flex flex-col items-center px-10 w-full pb-10'
      >
        {children}
        <ButtonForm text={titleSubmit} />
      </form>
    </div>
  </div>
);

export default BaseForm;
