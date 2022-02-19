import React, { useEffect, useState } from 'react';
import ItemIssue from 'components/ItemIssue';
import CabeceraList from 'components/CabeceraList';
import {
  getAllIssues,
  getAllIssuesByProyect,
  getAllIssuesByUser,
} from 'servicios/issues';

const Issues = ({ opt, id }) => {
  const [issues, getIssues] = useState([]);

  useEffect(() => {
    switch (opt) {
      case 1:
        getIssues(getAllIssuesByProyect(id));
        break;
      case 2:
        getIssues(getAllIssuesByUser(id));
        break;
      default:
        getIssues(getAllIssues());
    }
  }, []);

  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <CabeceraList title='Issues' placeholder='issue' />
      <div className='flex flex-col gap-[2px] px-2 py-10'>
        <div className=' flex flex-row items-center h-[50px] px-3 justify-between'>
          <span>Nombre de Issue</span>
          <span className='fixed left-[500px]'>Proyecto</span>
          <div className='flex flex-row justify-between items-center w-[1000px] pr-20'>
            <span>Developer</span>
            <span>Categoria</span>
            <span>Prioriada</span>
            <span>Status</span>
          </div>
        </div>
        <div className=' flex items-center rounded-md border-colorNegro border-2 w-full h-[50px] px-3'>
          <span>Adregar Issue</span>
        </div>
        {issues.map((issue) => (
          <ItemIssue issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default Issues;
