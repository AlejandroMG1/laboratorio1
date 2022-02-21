import React from 'react';
import { Link } from 'react-router-dom';

const ItemIssue = ({ issue }) => (
  <Link to={`/Issues/DetallesIssue/${issue.id}`}>
    <div className='flex flex-row items-center w-full h-[50px] px-3 justify-between rounded-md  border-colorNegro border-2 hover:bg-[#d9e0ed] cursor-pointer oveflow-hidden'>
      <div className=' grid grid-cols-6 gap-2 relative pr-8 w-full justify-between text-ellipsis overflow-hidden'>
        <span className='max-lines-2 text-colorNegro my-auto text-ellipsis overflow-hidden'>
          {issue.description}
        </span>
        <span className=' text-colorNegro my-auto max-lines-2 text-ellipsis overflow-hidden'>
          {issue.project ? issue.project.name : 'No asignado'}
        </span>
        <span className=' text-colorNegro my-auto max-lines-1 text-ellipsis overflow-hidden'>
          {issue.developer ? issue.developer.email : 'No asignado'}
        </span>
        <span className=' text-colorNegro my-auto'>{issue.category}</span>
        <span className='text-colorNegro my-auto'>{issue.priority}</span>
        <span className='text-right text-colorNegro my-auto'>
          {issue.status}
        </span>
      </div>
    </div>
  </Link>
);

export default ItemIssue;
