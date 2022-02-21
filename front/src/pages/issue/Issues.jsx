import React, { useEffect, useState } from 'react';
import ItemIssue from 'components/ItemIssue';
import CabeceraList from 'components/CabeceraList';
import { getAllIssuesByUser, getAllIssuesByProyect } from 'servicios/issues';
import { auth } from 'servicios/auth';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';

const Issues = ({ id }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (id) {
      setIssues(await getAllIssuesByProyect(id, auth.id));
    } else {
      setIssues(await getAllIssuesByUser(auth.id));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col pt-8 px-16  w-full'>
      <CabeceraList title='Issues' />
      <div className='flex flex-col gap-[2px] px-2 py-10'>
        <div className=' flex flex-row items-center h-[50px] px-3 justify-between'>
          <div className='grid grid-cols-6 items-center relative w-full'>
            <span>Descripción</span>
            <span>Proyecto</span>
            <span>Developer</span>
            <span>Categoría</span>
            <span>Prioriada</span>
            <span className='text-center'>Status</span>
          </div>
        </div>
        {auth.role !== 'Desarrollador' ? (
          <Link to={`/CrearIssue/${id}`}>
            <div className=' flex items-center rounded-md border-colorNegro border-2 w-full h-[50px] px-3 hover:bg-[#d9e0ed] cursor-pointer'>
              <span>Agregar Issue</span>
            </div>
          </Link>
        ) : null}

        {issues.map((issue) => (
          <ItemIssue key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default Issues;
