import React from 'react';

const ItemIssue = ({ issue }) => (
  <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2'>
    <span className='text-center text-colorNegro'>{issue.name}</span>
    <span className='text-center text-colorNegro fixed left-[500px]'>
      {issue.proyecto}
    </span>
    <div className='flex flex-row items-center relative pr-20 w-[1000px] justify-between'>
      <span className='text-center text-colorNegro'>{issue.developer}</span>
      <span className='text-center text-colorNegro'>{issue.categoria}</span>
      <span className='text-center text-colorNegro'>{issue.priorida}</span>
      <span className='text-center text-colorNegro'>{issue.status}</span>
    </div>
  </div>
);

export default ItemIssue;
