/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-imports */
import React from 'react';
import ButtonNav from 'components/ButtonNav';
import logo from 'assets/2.svg';

const Navbar = (props) => {
  const { user } = props;
  return (
    <nav className='flex flex-row w-full bg-colorNegro items-center px-4 justify-between '>
      <div className='flex items-center'>
        <img className='h-12 w-12 stroke-colorBlanco' src={logo} />
        <span className='text-colorBlanco text-2xl pl-4'>Bit software</span>
      </div>
      <div className='flex flex-row gap-x-3 '>
        {user.role === 'Administrador' && (
          <ButtonNav
            names={['crear Empresa']}
            rutas={['/CrearEmpresa']}
            title='Empresa'
          />
        )}
        <ButtonNav
          names={['ver proyectos', 'crear proyectos']}
          rutas={['/proyectos', '/CrearProyecto']}
          title='Proyecto'
        />
        <ButtonNav
          names={['ver Usuarios', 'crear Usuario']}
          rutas={['/Usuarios', '/CrearUsuario']}
          title='Usuario'
        />
        <ButtonNav
          names={['ver Issues', 'crear Issue']}
          rutas={['/Issues', '/CrearIssue']}
          title='Issue'
        />
      </div>
      <div className=''>
        <span className='text-colorBlanco text-2xl justify-self-end'>
          {user.email}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
