import React from 'react';
import { Link } from 'react-router-dom';

const ItemIssue = ({ issue }) => (
  <Link to={`DetallesIssue/${issue.id}`}>
    <div className=' flex flex-row items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2 hover:bg-[#d9e0ed] cursor-pointer'>
      <span className='text-center text-colorNegro'>{issue.description}</span>
      <span className='text-center text-colorNegro'>
        {issue.project ? issue.project.name : 'No asignado'}
      </span>
      <div className='flex flex-row items-center relative pr-8 w-[950px] justify-between'>
        <span className='text-center text-colorNegro'>
          {issue.developer ? issue.developer.email : 'No asignado'}
        </span>
        <span className='text-center text-colorNegro'>{issue.category}</span>
        <span className='text-center text-colorNegro'>{issue.priority}</span>
        <span className='text-center text-colorNegro'>{issue.status}</span>
      </div>
    </div>
  </Link>
);

export default ItemIssue;
